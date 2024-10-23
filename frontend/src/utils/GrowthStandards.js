export const growthStandards = {
  weightForAge: {
    male: [
      { age: 0, p3: 2.9, p15: 3.2, p50: 3.5, p85: 3.9, p97: 4.2 },
      { age: 1, p3: 3.9, p15: 4.3, p50: 4.7, p85: 5.1, p97: 5.5 },
      { age: 12, p3: 8.2, p15: 8.8, p50: 9.6, p85: 10.5, p97: 11.3 },
      { age: 24, p3: 10.2, p15: 11.0, p50: 12.2, p85: 13.5, p97: 14.7 },
      { age: 36, p3: 11.8, p15: 12.7, p50: 14.1, p85: 15.8, p97: 17.3 },
      { age: 48, p3: 13.3, p15: 14.4, p50: 16.1, p85: 18.2, p97: 20.2 },
      { age: 60, p3: 14.7, p15: 16.0, p50: 18.0, p85: 20.5, p97: 23.0 }
    ],
    female: [
      { age: 0, p3: 2.8, p15: 3.1, p50: 3.4, p85: 3.7, p97: 4.0 },
      { age: 1, p3: 3.6, p15: 3.9, p50: 4.3, p85: 4.7, p97: 5.0 },
      { age: 12, p3: 7.6, p15: 8.2, p50: 9.0, p85: 9.9, p97: 10.8 },
      { age: 24, p3: 9.7, p15: 10.5, p50: 11.7, p85: 13.0, p97: 14.2 },
      { age: 36, p3: 11.4, p15: 12.4, p50: 13.8, p85: 15.5, p97: 17.1 },
      { age: 48, p3: 12.9, p15: 14.1, p50: 15.8, p85: 17.9, p97: 19.9 },
      { age: 60, p3: 14.3, p15: 15.7, p50: 17.8, p85: 20.3, p97: 22.8 }
    ]
  },
  heightForAge: {
    male: [
      { age: 0, p3: 47.0, p15: 48.5, p50: 50.0, p85: 51.5, p97: 53.0 },
      { age: 1, p3: 51.5, p15: 53.0, p50: 54.5, p85: 56.0, p97: 57.5 },
      { age: 12, p3: 71.0, p15: 72.8, p50: 75.0, p85: 77.2, p97: 79.0 },
      { age: 24, p3: 82.1, p15: 84.3, p50: 87.0, p85: 89.7, p97: 91.9 },
      { age: 36, p3: 90.5, p15: 93.0, p50: 96.0, p85: 99.0, p97: 101.5 },
      { age: 48, p3: 97.5, p15: 100.3, p50: 103.5, p85: 106.7, p97: 109.5 },
      { age: 60, p3: 103.5, p15: 106.5, p50: 110.0, p85: 113.5, p97: 116.5 }
    ],
    female: [
      { age: 0, p3: 46.5, p15: 48.0, p50: 49.5, p85: 51.0, p97: 52.5 },
      { age: 1, p3: 50.5, p15: 52.0, p50: 53.5, p85: 55.0, p97: 56.5 },
      { age: 12, p3: 69.5, p15: 71.3, p50: 73.5, p85: 75.7, p97: 77.5 },
      { age: 24, p3: 80.5, p15: 82.7, p50: 85.5, p85: 88.3, p97: 90.5 },
      { age: 36, p3: 89.0, p15: 91.5, p50: 94.5, p85: 97.5, p97: 100.0 },
      { age: 48, p3: 96.0, p15: 98.8, p50: 102.0, p85: 105.2, p97: 108.0 },
      { age: 60, p3: 102.0, p15: 105.0, p50: 108.5, p85: 112.0, p97: 115.0 }
    ]
  }
};

export function getGrowthStatus(age, gender, weight, height) {
  const heightStandards = (growthStandards.height || []).filter((standard) => standard.gender === gender);
  const weightStandards = (growthStandards.weight || []).filter((standard) => standard.gender === gender);


  let weightStatus, heightStatus;

  if (weight < weightData.p3) weightStatus = "Sangat Kurang";
  else if (weight < weightData.p15) weightStatus = "Kurang";
  else if (weight < weightData.p85) weightStatus = "Normal";
  else if (weight < weightData.p97) weightStatus = "Risiko Berat Badan Lebih";
  else weightStatus = "Berat Badan Lebih";

  if (height < heightData.p3) heightStatus = "Sangat Pendek";
  else if (height < heightData.p15) heightStatus = "Pendek";
  else if (height < heightData.p85) heightStatus = "Normal";
  else if (height < heightData.p97) heightStatus = "Tinggi";
  else heightStatus = "Sangat Tinggi";

  return { weightStatus, heightStatus };
}