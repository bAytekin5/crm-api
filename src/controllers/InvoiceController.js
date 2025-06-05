import BaseController from "../core/BaseController.js";
import InvoiceService from "../services/InvoiceService.js";

export default class InvoiceController extends BaseController {
  constructor() {
    super(new InvoiceService());
  }
}
