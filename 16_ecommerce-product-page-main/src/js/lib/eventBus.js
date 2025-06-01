/**
 * Event-Bus - EDA
 *
 * @returns{Object} - An event bus object with `subscribe` and `publish` methods.
 */
export const createEventBus = () => {
  let events = {};

  const EventBus = {
    subscribe(event, callback) {
      events[event] = events[event] || [];
      events[event].push(callback);
    },

    publish(event, data) {
      events[event].forEach((callback) => {
        callback(data);
      });
    },
  };

  return EventBus;
};
