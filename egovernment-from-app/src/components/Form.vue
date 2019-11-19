<template>
  <div class="form">
    <div class="form-entry">
      <h4 class="title is-4">Tip abonament</h4>
      <h5 class="subtitle is-5">Selecteaza tipul de persoana pentru care se realizeaza abonamentul</h5>
      <div class="select">
        <select @change="typeSelectorChanged($event)" placeholder="Tip persoana">
          <option value disabled selected>Selecteaza optiunea</option>
          <option value="fizica">Persoana Fizica</option>
          <option value="juridica">Persoana Juridica</option>
        </select>
      </div>
    </div>

    <div v-if="shouldDisplayForm">
      <!-- General info *********************************************************** -->
      <h4 class="title is-4">Informatii generale</h4>
      <div v-for="(formEntry, index) in curentInputModel.personalInfoFields" v-bind:key="index">
        <div class="form-entry">
          <h5 class="title is-5">{{formEntry.title}}</h5>
          <ErrorLabel v-if="formEntry.hasError" :errorMessage="formEntry.errorDetail" />
          <input
            class="input"
            :class="{'is-danger': formEntry.hasError}"
            type="text"
            :placeholder="formEntry.placeholder"
            @change="verifyInputEvent($event, formEntry)"
            :value="formEntry.value"
          />
        </div>
      </div>
      <!-- Subscription details *********************************************************** -->
      <h4 class="title is-4">Informatii abonament</h4>
      <div
        class="form-entry"
        v-for="model in curentInputModel.subscriptionInfo.subscriptionModels"
        v-bind:key="model.title"
      >
        <h5 class="title is-5">{{model.title}}</h5>
        <div class="content" v-html="model.description"/>
        <ErrorLabel v-if="model.hasError" errorMessage="Trebuie sa selectezi o optiune" />
        <div class="select">
          <select v-model="model.value">
            <option value="0" disabled selected>Selecteaza optiunea</option>
            <option
              v-for="option in model.options"
              :value="option"
              v-bind:key="option.value"
            >{{option.text}}</option>
          </select>
        </div>
      </div>

      <!-- Bottom buttom ******************************* -->
      <div class="my-container">
        <button
          class="button is-info is-large cost-button"
          @click="computeCost()"
        >Calculeaza cost total</button>
      </div>

      <!-- Modal display *******************************-->
      <div class="modal" :class="{'is-active': shouldDisplayTotalCost}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <div v-if="!modal_shouldDisplaySubscriptionEvent">
              <h4 class="title is-4">Cost fara TVA: {{totalCost}} RON</h4>
              <h4 class="title is-4">Cost cu TVA (24%): {{totalCostWithVAT}} RON</h4>
              <div class="columns">
                <div class="column">
                    <button class="button is-info">Obtine ordin de plata</button>
                </div>
                <div class="column">
                  <button @click="saveFormData()" class="button is-info">Inregistreaza informatiile</button>
                </div>
              </div>
            </div>

            <div v-if="modal_shouldDisplaySubscriptionEvent" class="modal-message">
              <div v-if="modal_shouldDisplaySucces">
                <h4 class="title is-4">Date inregistrate cu success</h4>
                <a :href="dataToDownload" download="info.xml">
                  <button class="button cost-button is-info">Descarca XML</button>
                </a>
              </div>
              <div v-if="modal_shouldDisplayError">
                <h4 class="title is-4">Hopa! Datele nu s-au putut incarca pe server</h4>
              </div>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeModal()"></button>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorLabel from "./ErrorLabel";
import { db } from "../firebase";
import formModel from "../form-model";
/* eslint-disable no-console */
export default {
  name: "Form",
  components: {
    ErrorLabel,
  },
  firestore() {
    return {
      juridicFormData: db.collection("juridic-form-data"),
      fizicFormData: db.collection("fizic-form-data")
    };
  },

  data: function() {
    return {
      // Constant
      VATMultiplier: 1.24,
      formType: undefined,
      shouldDisplayForm: false,
      shouldDisplayTotalCost: false,
      totalCost: 0,

      modal_shouldDisplaySubscriptionEvent: false,
      modal_shouldDisplaySucces: false,
      modal_shouldDisplayError: false,
      inputs: formModel,
      dataToDownload: "nimic"
    };
  },
  computed: {
    curentInputModel: function() {
      return this.formType == "juridica"
        ? this.inputs.juridica
        : this.inputs.fizica;
    },
    totalCostWithVAT: function() {
      return this.totalCost * this.VATMultiplier;
    }
  },
  methods: {
    // Global type selector handler
    typeSelectorChanged: function(event) {
      this.shouldDisplayForm = true;
      this.formType = event.target.value;
    },

    verifyInputEvent: function(event, formElement) {
      let input = event.target.value;
      this.verrifyInput(input, formElement);
    },

    verrifyInput: function(input, formElement) {
      formElement.value = input;
      let validationResult;
      if (input.length == 0) {
        validationResult = "Campul nu poate sa fie gol";
      } else {
        validationResult = formElement.validation(input);
      }
      formElement.errorDetail = validationResult;
      this.setError(validationResult.length != 0, formElement);
    },

    setError(value, formElement) {
      formElement.hasError = value;
    },

    computeCost() {
      if (this.validateFields()) {
        this.shouldDisplayTotalCost = true;
        let subscriptionValues = this.curentInputModel.subscriptionInfo.subscriptionModels.map(
          model => {
            return parseInt(model.value.value, 10);
          }
        );
        if (this.formType == "juridica") {
          this.totalCost = subscriptionValues[0] * subscriptionValues[1];
        } else if (this.formType == "fizica") {
          this.totalCost =
            subscriptionValues[0] * (1 - 1 / subscriptionValues[1]);
        }
      }
    },

    closeModal() {
      this.shouldDisplayTotalCost = false;
    },

    validateFields() {
      let validationResult = true;
      this.curentInputModel.personalInfoFields.forEach(element => {
        this.verrifyInput(element.value, element);
        if (element.hasError) {
          validationResult = false;
        }
      });

      this.curentInputModel.subscriptionInfo.subscriptionModels.forEach(
        element => {
          if (element.value == "0") {
            element.hasError = true;
            validationResult = false;
          } else {
            element.hasError = false;
          }
        }
      );
      return validationResult;
    },

    saveFormData() {
      let dataToSave;
      let collection;
      let inputModel;

      if (this.formType == "juridica") {
        inputModel = this.inputs.juridica;
        dataToSave = {
          juridicId: inputModel.personalInfoFields[0].value,
          entityName: inputModel.personalInfoFields[1].value,
          fullAddress: inputModel.personalInfoFields[2].value,
          email: inputModel.personalInfoFields[3].value,
          phone: inputModel.personalInfoFields[4].value,

          subscriptionInfo: {
            timeDuration:
              inputModel.subscriptionInfo.subscriptionModels[0].value,
            numberOfCars: parseInt(
              inputModel.subscriptionInfo.subscriptionModels[1].value.value
            )
          }
        };
        collection = this.$firestore.juridicFormData;
      } else if (this.formType == "fizica") {
        inputModel = this.inputs.fizica;
        dataToSave = {
          fullName: inputModel.personalInfoFields[0].value,
          numericPersonalCode: inputModel.personalInfoFields[1].value,
          fullAddress: inputModel.personalInfoFields[2].value,
          email: inputModel.personalInfoFields[3].value,
          phone: inputModel.personalInfoFields[4].value,

          subscriptionInfo: {
            timeDuration:
              inputModel.subscriptionInfo.subscriptionModels[0].value,
            subscriptionType:
              inputModel.subscriptionInfo.subscriptionModels[1].value
          }
        };
        collection = this.$firestore.fizicFormData;
      }

      console.log("Saving data:");
      console.log();
      this.dataToDownload = "data:text/xml;charset=utf-8," + encodeURIComponent(JSON.stringify(this.OBJtoXML(dataToSave)))
      collection.add(dataToSave).then(
        () => {
          this.modal_shouldDisplaySubscriptionEvent = true;
          this.modal_shouldDisplaySucces = true;
          console.log("Succesfuly saved data in firestore");
          this.resetData(inputModel)
        },
        error => {
          this.modal_shouldDisplaySubscriptionEvent = true;
          this.modal_shouldDisplayError = true;
          console.log("Error while saving data in firestore");
          console.log(error);
        }
      );
    },

    resetData(inputModel) {
      inputModel.personalInfoFields.forEach(element => {
        element.value = ""
        element.hasError = false
        element.errorDetail = ""
      })

      inputModel.subscriptionInfo.subscriptionModels.forEach(element => {
        element.value = "0"
        element.hasError = false
      })
    },

    OBJtoXML(obj) {
    var xml = '';
    for (var prop in obj) {
        xml += "<" + prop + ">";
        if(Array.isArray(obj[prop])) {
            for (var array of obj[prop]) {

                // A real botch fix here
                xml += "</" + prop + ">";
                xml += "<" + prop + ">";

                xml += this.OBJtoXML(new Object(array));
            }
        } else if (typeof obj[prop] == "object") {
            xml += this.OBJtoXML(new Object(obj[prop]));
        } else {
            xml += obj[prop];
        }
        xml += "</" + prop + ">";
    }
    var ret = xml.replace(/<\/?[0-9]{1,}>/g,'');
    return ret
},
 downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  }
};
</script>

<style scoped>
.form-entry {
  margin: 16px 0;
}
.box {
  text-align: center;
}

.cost-button {
  min-width: 10vw;
  margin: 16px auto;
  display: block;
}

.my-container {
  width: 100%;
}
.modal-message {
  text-align: center;
}
</style>
