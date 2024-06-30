import { PolynamesApplication } from "./application/polynames-application.js";
import { screenService } from "./services/screen-service.js";

window.addEventListener("DOMContentLoaded", () => {
    const app = new PolynamesApplication();
});

window.addEventListener("resize", () => { screenService.updateApplicationHeight(); });

screenService.updateApplicationHeight();