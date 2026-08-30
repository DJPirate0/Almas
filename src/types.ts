export interface ServiceOption {
  id: string;
  name: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  options: ServiceOption[];
}

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string; // references lucide-react icon names
  imageRef?: string; // visual asset
  categories: ServiceCategory[];
}

export interface SelectedOption {
  serviceId: string;
  categoryId: string;
  optionId: string;
}

export interface OrderRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceId: string;
  serviceName: string;
  selectedOptions: {
    optionId: string;
    optionName: string;
    categoryName: string;
  }[];
  projectDescription: string;
  preferredTimeline?: string;
  budgetPreference?: string;
  createdAt: string;
  status?: 'submitted' | 'in-review' | 'contacted';
}

// Alias for compatibility
export type Inquiry = OrderRequest;
