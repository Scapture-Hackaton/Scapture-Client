export interface userData {
  endDate: string | null;
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
  data: string;
  date: string;
  name: string;
  hours: string;
  message: string;
}
