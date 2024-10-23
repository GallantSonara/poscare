<template>
  <div v-if="weightChartData && heightChartData" class="flex flex-col gap-4">
    <div style="height: 400px">
      <Line :data="weightChartData" :options="weightChartOptions" />
    </div>
    <div style="height: 400px">
      <Line :data="heightChartData" :options="heightChartOptions" />
    </div>
  </div>
  <div v-else>Loading...</div>
  <div v-if="recommendation" class="mt-4 p-4 bg-blue-100 rounded-lg">
    <h3 class="font-bold text-lg mb-2">Rekomendasi:</h3>
    <p>{{ recommendation }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { Line } from "vue-chartjs";
import { watchEffect } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import formatTime from "../../../utils/FormatTime";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  childId: {
    type: String,
    required: true,
  },
});

const store = useStore();
const weightChartData = ref(null);
const heightChartData = ref(null);
const recommendation = ref("");

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      title: {
        display: true,
        text: 'Usia (bulan)'
      },
      ticks: {
        callback: function(value) {
          return value;
        }
      },
      min: 0,
      max: 60,
      reverse: false // Pastikan reverse diatur ke false untuk garis dari kiri ke kanan
    },
    y: {
      type: 'linear',
      position: 'left',
      title: {
        display: true,
        text: 'Nilai'
      },
    },
  },
};

const weightChartOptions = {
  ...commonOptions,
  plugins: {
    ...commonOptions.plugins,
    title: {
      display: true,
      text: 'Grafik Berat Badan'
    }
  },
  scales: {
    ...commonOptions.scales,
    y: {
      ...commonOptions.scales.y,
      title: {
        ...commonOptions.scales.y.title,
        text: 'Berat Badan (kg)'
      }
    },
  }
};

const heightChartOptions = {
  ...commonOptions,
  plugins: {
    ...commonOptions.plugins,
    title: {
      display: true,
      text: 'Grafik Tinggi Badan'
    }
  },
  scales: {
    ...commonOptions.scales,
    y: {
      ...commonOptions.scales.y,
      title: {
        ...commonOptions.scales.y.title,
        text: 'Tinggi Badan (cm)'
      }
    },
  }
};

const fetchGrowthData = async (childId) => {
  try {
    const response = await store.dispatch('fetchGrowthWithStandards', childId);
    console.log('Full response:', response);

    if (!response || !response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.error('Invalid or empty data received');
      weightChartData.value = null;
      heightChartData.value = null;
      recommendation.value = "Tidak ada data pertumbuhan yang tersedia.";
      return;
    }

    const data = response.data;
    console.log('Processed data:', data);

    const ages = data.map((record) => record.ageInMonths);
    const weights = data.map((record) => record.weightBody);
    const heights = data.map((record) => record.heightBody);
    const weightStandardsMin = data.map((record) => record.weightStandard[0]);
    const weightStandardsMax = data.map((record) => record.weightStandard[2]);
    const heightStandardsMin = data.map((record) => record.heightStandard[0]);
    const heightStandardsMax = data.map((record) => record.heightStandard[2]);

    weightChartData.value = {
      labels: ages,
      datasets: [
        {
          label: 'Berat Badan',
          data: weights,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
        },
        {
          label: 'Berat Minimal',
          data: weightStandardsMin,
          borderColor: 'rgba(34, 139, 34, 1)',
          backgroundColor: 'rgba(554, 110, 0, 1)',
          fill: false,
          borderDash: [5, 5],
        },
        {
          label: 'Berat Maksimal',
          data: weightStandardsMax,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
          borderDash: [5, 5],
        },
      ]
    };

    heightChartData.value = {
      labels: ages,
      datasets: [
        {
          label: 'Tinggi Badan',
          data: heights,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: false,
        },
        {
          label: 'Tinggi Minimal',
          data: heightStandardsMin,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          fill: false,
          borderDash: [5, 5],
        },
        {
          label: 'Tinggi Maksimal',
          data: heightStandardsMax,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          fill: false,
          borderDash: [5, 5],
        },
      ]
    };

    console.log('Chart data set:', weightChartData.value, heightChartData.value);

    updateRecommendation(data[data.length - 1]);
  } catch (error) {
    console.error("Error fetching growth data:", error);
    weightChartData.value = null;
    heightChartData.value = null;
    recommendation.value = "Gagal memuat data pertumbuhan. Silakan coba lagi nanti.";
  }
};
const updateRecommendation = (latestData) => {
  if (!latestData) {
    recommendation.value = "Tidak ada data pertumbuhan terbaru.";
    return;
  }

  const weight = latestData.weightBody;
  const height = latestData.heightBody;
  const [weightMin, weightIdeal, weightMax] = latestData.weightStandard;
  const [heightMin, heightIdeal, heightMax] = latestData.heightStandard;

  let weightStatus, heightStatus;

  if (weight < weightMin) {
    weightStatus = "kurang";
  } else if (weight > weightMax) {
    weightStatus = "berlebih";
  } else {
    weightStatus = "normal";
  }

  if (height < heightMin) {
    heightStatus = "kurang";
  } else if (height > heightMax) {
    heightStatus = "berlebih";
  } else {
    heightStatus = "normal";
  }

  recommendation.value = `Berat badan anak ${weightStatus} dan tinggi badan ${heightStatus}. `;

  if (weightStatus !== "normal") {
    recommendation.value += `Disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk menyesuaikan pola makan anak. `;
  }

  if (heightStatus !== "normal") {
    recommendation.value += `Pastikan anak mendapatkan nutrisi yang cukup dan olahraga yang tepat untuk mendukung pertumbuhan optimal. `;
  }

  if (weightStatus === "normal" && heightStatus === "normal") {
    recommendation.value += "Pertahankan pola makan dan gaya hidup sehat anak.";
  }
};

watchEffect(() => {
  if (props.childId) {
    console.log('Fetching growth data for childId:', props.childId);
    fetchGrowthData(props.childId);
  }
});

onMounted(async () => {
  if (props.childId) {
    console.log('Fetching growth data for childId:', props.childId);
    await fetchGrowthData(props.childId);
  }
});

watch(
  () => props.childId,
  async (newChildId) => {
    if (newChildId) {
      console.log('ChildId changed to:', newChildId);
      await fetchGrowthData(newChildId);
    }
  }
);

</script>