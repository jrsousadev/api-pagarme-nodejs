import { container } from "tsyringe";
import { CartRepository } from "../../repositories/CartRepository";
import { TransactionRepository } from "../../repositories/TransactionRepository";
import { TransactionModule } from "../../modules/TransactionModule";
import { CartModule } from "../../modules/CartModule";
import { PagarMeProvider } from "../../providers/PagarMeProvider";

container.registerSingleton<CartRepository>("CartRepository", CartModule);

container.registerSingleton<TransactionRepository>(
  "TransactionRepository",
  TransactionModule
);

container.registerSingleton<PagarMeProvider>(
  "PagarMeProvider",
  PagarMeProvider,
)

