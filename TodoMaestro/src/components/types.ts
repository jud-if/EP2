// types.ts
interface JobData {
    title: string;
    subtitle?: string;
    content: string;
    region: string;
    comuna: string;
    salario: number;
    fecha_creacion: string;
  }
  
  interface Action {
    label: string;
    icon?: string;
    onClick?: () => void;
  }
  
  interface EnhancedJobData extends JobData {
    actions: Action[];
  }