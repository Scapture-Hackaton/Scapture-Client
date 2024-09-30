export interface userData {
  endDate: string;
  image: string | undefined;
  location: string;
  name: string;
  role: string;
  team: string;
}

export interface bananaData {
  balance: number;
  subscribed: boolean;
}

export interface subscribedData {
  subscribed: boolean;
}

export interface reservationData {
  date: string;
  stadiumName: string;
  fieldName: string;
  hours: string;
  fieldType: string;
  isAvailable: boolean;
}
