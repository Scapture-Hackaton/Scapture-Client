export interface userData {
  endDate: string | null;
  image: string | undefined;
  location: string | null;
  name: string | null;
  role: string | null;
  team: string | null;
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
