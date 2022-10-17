import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { CreateTransactionUseCase } from "../../useCases/TransactionUseCases/CreateTransactionUseCases";

class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const {
        cartCode,
        paymentType,
        installments,
        customerName,
        customerEmail,
        customerMobile,
        customerDocument,
        billingAddress,
        billingNumber,
        billingNeighborhood,
        billingComplementary,
        billingCity,
        billingState,
        billingZipCode,
        creditCardNumber,
        creditCardExpiration,
        creditCardHolderName,
        creditCardCvv,
        pixExpirationDate,
      } = request.body;

      const createTransactionUseCase = container.resolve(
        CreateTransactionUseCase
      );

      const transaction: any = await createTransactionUseCase.execute({
        cartCode,
        paymentType,
        installments,
        customerName,
        customerEmail,
        customerMobile,
        customerDocument,
        billingAddress,
        billingNumber,
        billingNeighborhood,
        billingComplementary,
        billingCity,
        billingState,
        billingZipCode,
        creditCardNumber,
        creditCardExpiration,
        creditCardHolderName,
        creditCardCvv,
        pixExpirationDate,
      });

      if (transaction.message) throw new AppError(transaction.message, transaction.statusCode);

      return response.status(201).json(transaction);
    } catch (err: any) {
      console.log(err)
      return response.status(err.statusCode).json(err);
    }
  }
}

export default new CreateTransactionController();
