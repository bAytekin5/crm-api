import BaseController from "../core/BaseController.js";
import CustomerService from "../services/CustomerService.js";

export default class CustomerController extends BaseController {
  constructor() {
    super(new CustomerService());
  }
}
