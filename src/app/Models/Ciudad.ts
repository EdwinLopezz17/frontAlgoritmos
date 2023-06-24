

export interface Ciudad {
  id: number;
  name: string;
  distancia: number;
  visitado: boolean;
  camino: Ciudad[];
}
