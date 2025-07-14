// Keep-alive utility to prevent Render from sleeping
export class KeepAlive {
  private intervalId: number | null = null;
  private readonly pingInterval = 14 * 60 * 1000; // 14 minutes (Render sleeps after 15 min)

  start() {
    if (this.intervalId) return;

    // Self-ping to keep the app alive
    this.intervalId = setInterval(() => {
      fetch(window.location.origin + '/health-check', {
        method: 'GET',
        cache: 'no-cache'
      }).catch(() => {
        // Fallback: ping current page
        fetch(window.location.href, {
          method: 'HEAD',
          cache: 'no-cache'
        }).catch(() => console.log('Keep-alive ping failed'));
      });
    }, this.pingInterval);

    console.log('Keep-alive started - pinging every 14 minutes');
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Keep-alive stopped');
    }
  }
}

export const keepAlive = new KeepAlive();