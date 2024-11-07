import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: JSON.parse(localStorage.getItem('events')) || [],  // Lấy dữ liệu từ localStorage hoặc mặc định là mảng rỗng
  }),
  actions: {
    addEvent(event) {
      this.events.push(event);
      this.saveToLocalStorage(); // Lưu lại vào localStorage
    },
    updateEvent(updatedEvent) {
      const index = this.events.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) {
        this.events[index] = updatedEvent;
        this.saveToLocalStorage(); // Lưu lại vào localStorage
      }
    },
    deleteEvent(eventId) {
      this.events = this.events.filter(e => e.id !== eventId);
      this.saveToLocalStorage(); // Lưu lại vào localStorage
    },
    saveToLocalStorage() {
      localStorage.setItem('events', JSON.stringify(this.events)); // Lưu mảng sự kiện vào localStorage
    }
  }
})
