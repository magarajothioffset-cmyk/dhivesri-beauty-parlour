export interface SalemZone {
  name: string;
  category: 'Salem City' | 'North Salem' | 'South Salem' | 'East Salem' | 'West Salem' | 'Salem District Towns';
  neighborhoods: string[];
}

export const SALEM_DISTRICT_AREAS: SalemZone[] = [
  {
    name: 'Salem City Central & Prime',
    category: 'Salem City',
    neighborhoods: ['Fairlands', 'Alagapuram', 'Hasthampatti', 'Four Roads', 'Cherry Road', 'New Bus Stand Area', 'Old Bus Stand Area', 'Meyyanur'],
  },
  {
    name: 'North & West Salem',
    category: 'North Salem',
    neighborhoods: ['Suramangalam', 'Junction Area', 'Kandhampatti', 'Gorimedu', 'Narasothipatti', 'Reddiyur', 'Kuranguchavadi', 'Mamangam'],
  },
  {
    name: 'East & South Salem',
    category: 'East Salem',
    neighborhoods: ['Ammapet', 'Shevapet', 'Kondalampatti', 'Dadagapatti', 'Ponnammapet', 'Annathanapatti', 'Gugai', 'Sanniyasigundu'],
  },
  {
    name: 'Salem Outskirts & Suburbs',
    category: 'Salem District Towns',
    neighborhoods: ['Kannankurichi', 'Yercaud Foot Hills', 'Koolamedu', 'Karuppur', 'Ayothiapattinam', 'Valapady', 'Attur'],
  },
  {
    name: 'District Wide Hubs',
    category: 'Salem District Towns',
    neighborhoods: ['Omalur', 'Mettur', 'Sankagiri', 'Edappadi', 'Tharamangalam', 'Jalakandapuram', 'Mecheri'],
  },
];
