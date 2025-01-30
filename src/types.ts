export type Market = {
  id: string;
  title: string;
  description: string;
  endDate: string;
  totalLiquidity: number;
  outcomes: {
    name: string;
    probability: number;
  }[];
}; 