<template>
  <div>
    <div v-if="isLoading" class="loading-container">
      <div class="spinner">
        <sync-loader :loading="true"></sync-loader>
      </div>
    </div>
    <div v-if="!isLoading">
      <h3 class="title is-3">Raport persoane juridice</h3>
      <h4 class="subtitle is-4">Numar masini persoane juridice inregistrate: <b>{{juridicCarCount}}</b></h4>

      <h4 class="subtitle is-4">Distributie abonamente juridice dupa perioada</h4>
      <BarChart :chartData="juridicSubscriptionCount" :options="defaultBarChartOptions" />

      <h4 class="subtitle is-4">Distributie numar de masini/abonament</h4>
      <PieChart :chartData="generalJuridicSubscriptionNoCars" :options="defaultBarChartOptions" />

      <h3 class="title is-3">Raport persoane fizice</h3>
      <h4 class="subtitle is-4">Numar masini persoane fizice inregistrate: <b>{{fizicCarCount}}</b></h4>

      <h4 class="subtitle is-4">Distributie abonamente fizice dupa perioada</h4>
      <BarChart :chartData="fizicSubscriptionCount" :options="defaultBarChartOptions" />

      <h4 class="subtitle is-4">Distributie tip abonamente fizice</h4>
      <DoughnutChart :chartData="generalFizicSubscriptionType" :options="defaultBarChartOptions" />
    </div>
  </div>
</template>

<script>
import PieChart from "./charts/PieChart"
import BarChart from "./charts/BarChart";
import DoughnutChart from "./charts/DoughnutChart";

import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import { db } from "../firebase";

export default {
  /* eslint-disable no-console */
  name: "Report",
  data: function() {
    return {
      // Loading status
      isLoading: true,
      // Effective data loaded from Firebase
      fizicData: [],
      juridicData: [],

      defaultBarChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      generalSubscriptionCount: {
        labels: ["1 saptamana", "1 luna", "6 luni", "1 an"],
        datasets: [
          {
            label: "Perioada abonament",
            backgroundColor: "#f87979",
            data: [0, 0, 0, 0]
          }
        ]
      },
      generalFizicSubscriptionType: {
        labels: ["Student", "Angajat UPB", "Personal administrativ"],
        datasets: [
          {
            label: "Tip abonament",
            backgroundColor: ["#ef88aa", "#11dd11", "#1111dd"],
            data: [0, 0, 0]
          }
        ]
      },
      generalJuridicSubscriptionNoCars: {
        labels: ["1 masina", "2 masini", "3 masini", "4 masini", "5 masini"],
        datasets: [
          {
            label: "Distributie numar masini",
            backgroundColor: ["#56ee34", "#04dda1", "#52cd50", "1122ff", "#12ef10"],
            data: [0, 0, 0, 0, 0]
          }
        ]
      },
      juridicSubscriptionCount: {},
      fizicSubscriptionCount: {},
      fizicCarCount: 0,
      juridicCarCount: 0
    };
  },
  components: {
    SyncLoader,
    BarChart,
    DoughnutChart,
    PieChart
  },
  firestore() {
    return {
      juridicFormData: db.collection("juridic-form-data"),
      fizicFormData: db.collection("fizic-form-data")
    };
  },
  methods: {
    loadData: function() {
      this.$firestore.fizicFormData.get().then(querySnapshotFizic => {
        querySnapshotFizic.forEach(doc => {
          this.fizicData.push(doc.data());
        });
        this.$firestore.juridicFormData.get().then(querySnapshotJuridic => {
          querySnapshotJuridic.forEach(doc => {
            this.juridicData.push(doc.data());
          });

          this.createGraphData();
          this.isLoading = false;
        });
      });
    },

    createGraphData: function() {
      this.createSubscriptionCount(this.juridicData, "juridic");
      this.createSubscriptionCount(this.fizicData, "fizic");
      this.createDoughnutData()
      this.createPieData()
      this.countCars()
    },

    createSubscriptionCount: function(source, type) {
      let subscriptionCountData = this.jsonCopy(this.generalSubscriptionCount);

      source.forEach(element => {
        let label = element.subscriptionInfo.timeDuration.text;

        subscriptionCountData.labels.forEach((labelElement, idx) => {
          if (labelElement == label) {
            subscriptionCountData.datasets[0].data[idx]++;
          }
        });
      });
      if (type == "juridic") {
        this.juridicSubscriptionCount = subscriptionCountData;
      } else {
        this.fizicSubscriptionCount = subscriptionCountData;
      }
    },

    createDoughnutData: function() {
        this.fizicData.forEach(element => {
            let label = element.subscriptionInfo.subscriptionType.text
            this.generalFizicSubscriptionType.labels.forEach((labelElement, idx) => {
                if(labelElement == label) {
                    this.generalFizicSubscriptionType.datasets[0].data[idx]++
                }
            })
        })
    },

    createPieData: function() {
        this.juridicData.forEach(element => {
            let carsCount = element.subscriptionInfo.numberOfCars
            this.generalJuridicSubscriptionNoCars.labels.forEach((labelElement, idx) => {
                if(parseInt(labelElement[0]) == carsCount) {
                    this.generalJuridicSubscriptionNoCars.datasets[0].data[idx]++
                }
            })
        })
    },

    countCars: function() {
        this.fizicCarCount = this.fizicData.length
        this.juridicCarCount = 0

        this.juridicData.forEach(element => {
            this.juridicCarCount += element.subscriptionInfo.numberOfCars
        })

    },

    // UTILITIES
    jsonCopy: function(src) {
      return JSON.parse(JSON.stringify(src));
    }
  },
  created: function() {
    this.isLoading = true;
    this.loadData();
  }
};
</script>

<style scoped>
.loading-container {
  width: 100%;
  height: 50vh;
}

.spinner {
  margin-top: 23vh;
  text-align: center;
}

.subtitle {
    margin-top: 16px;
}
</style>
