/**
 * Color mode store for managing theme state
 * This is a simple implementation that can be replaced with your preferred state management
 */

type ColorMode = "light" | "dark";

class ColorModeStore {
  private mode: ColorMode = "light";
  private listeners: ((mode: ColorMode) => void)[] = [];

  get colorMode(): ColorMode {
    return this.mode;
  }

  setColorMode(mode: ColorMode): void {
    this.mode = mode;
    this.listeners.forEach((listener) => listener(mode));
  }

  subscribe(listener: (mode: ColorMode) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  toggle(): void {
    this.setColorMode(this.mode === "light" ? "dark" : "light");
  }
}

const colorModeStore = new ColorModeStore();

export default colorModeStore;
