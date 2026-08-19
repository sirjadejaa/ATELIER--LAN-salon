"use client";

export type BookingState = {
  isOpen: boolean;
  serviceId?: string;
  staffId?: string;
  packageId?: string;
};

class SimpleBookingEmitter {
  private listeners: ((state: BookingState) => void)[] = [];
  private currentState: BookingState = {
    isOpen: false,
    serviceId: undefined,
    staffId: undefined,
    packageId: undefined,
  };

  subscribe(listener: (state: BookingState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  open(options?: { serviceId?: string; staffId?: string; packageId?: string }) {
    this.currentState = {
      isOpen: true,
      serviceId: options?.serviceId,
      staffId: options?.staffId,
      packageId: options?.packageId,
    };
    this.listeners.forEach((l) => l(this.currentState));
  }

  close() {
    this.currentState = {
      isOpen: false,
      serviceId: undefined,
      staffId: undefined,
      packageId: undefined,
    };
    this.listeners.forEach((l) => l(this.currentState));
  }

  getState() {
    return this.currentState;
  }
}

export const bookingEmitter = new SimpleBookingEmitter();
