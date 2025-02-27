/**
 * Service de gestion des commandes
 * Note: Dans une implémentation réelle, cela interagirait avec une base de données
 */

// Type pour représenter une commande
export interface Order {
  id: string;
  customerId?: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: string;
  paymentId?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Statuts possibles d'une commande
export enum OrderStatus {
  PENDING = 'pending',        // En attente de paiement
  PROCESSING = 'processing',  // Paiement en cours
  PAID = 'paid',              // Payée
  SHIPPED = 'shipped',        // Expédiée
  DELIVERED = 'delivered',    // Livrée
  CANCELLED = 'cancelled',    // Annulée
  REFUNDED = 'refunded',      // Remboursée
  FAILED = 'failed'           // Échec du paiement
}

// Élément de commande
export interface OrderItem {
  productId: string;
  productName: string;
  variationId?: string;
  price: number;
  quantity: number;
}

// En mémoire pour le développement, à remplacer par une base de données dans une implémentation réelle
const orders: Record<string, Order> = {};

export class OrderService {
  /**
   * Crée une nouvelle commande
   */
  static async createOrder(orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    orders[orderId] = newOrder;
    console.log(`Nouvelle commande créée: ${orderId}`);
    
    return newOrder;
  }
  
  /**
   * Récupère une commande par son ID
   */
  static async getOrderById(orderId: string): Promise<Order | null> {
    return orders[orderId] || null;
  }
  
  /**
   * Met à jour le statut d'une commande
   */
  static async updateOrderStatus(orderId: string, status: OrderStatus, paymentData?: { 
    paymentId?: string; 
    transactionId?: string;
  }): Promise<Order | null> {
    const order = orders[orderId];
    if (!order) {
      console.error(`Commande non trouvée: ${orderId}`);
      return null;
    }
    
    order.status = status;
    order.updatedAt = new Date();
    
    if (paymentData) {
      if (paymentData.paymentId) order.paymentId = paymentData.paymentId;
      if (paymentData.transactionId) order.transactionId = paymentData.transactionId;
    }
    
    console.log(`Commande ${orderId} mise à jour au statut: ${status}`);
    return order;
  }
  
  /**
   * Récupère les commandes par email client
   */
  static async getOrdersByCustomerEmail(email: string): Promise<Order[]> {
    return Object.values(orders).filter(order => order.customerEmail === email);
  }
}
