import axios from 'axios';

import { MIDTRANS_SECRET } from '../constants';
import { clientUrl } from '../constants/client-url-constants';
import { ResponseError } from '../error/ResponseError';

export class PaymentUtils {
  static async sendToPaymentGatewayLocal(
    transactionId: string,
    grossAmount: number,
    transactionItems: any[],
    customerDetails: any,
    exchangeRate: number,
  ): Promise<any> {
    const authString = btoa(`${MIDTRANS_SECRET.MIDTRANS_SERVER_KEY}:`);
    let itemDetails = [];

    if (transactionItems[0].couponPackageId) {
      itemDetails = transactionItems.map(item => ({
        id: item.couponPackageId,
        price: item.amount * exchangeRate,
        quantity: 1,
        name: item.name,
      }));
    } else if (transactionItems[0].membershipTypeId) {
      itemDetails = transactionItems.map(item => ({
        id: item.membershipTypeId,
        price: item.amount * exchangeRate,
        quantity: 1,
        name: item.name,
      }));
    } else {
      throw new ResponseError(400, 'Invalid Transaction Request');
    }

    const transactionPayload = {
      transaction_details: {
        order_id: transactionId,
        gross_amount: grossAmount,
      },
      item_details: itemDetails,
      customer_details: {
        first_name: customerDetails.firstName,
        email: customerDetails.email ? customerDetails.email : '',
      },
      callbacks: {
        finish: `${clientUrl.LOCAL}/order-status?transaction_id=${transactionId}`,
        error: `${clientUrl.LOCAL}/order-status?transaction_id=${transactionId}`,
        pending: `${clientUrl.LOCAL}/order-status?transaction_id=${transactionId}`,
      },
    };

    try {
      const response = await axios.post(
        `${MIDTRANS_SECRET.MIDTRANS_APP_URL}/snap/v1/transactions`,
        transactionPayload,
        {
          headers: {
            contentType: 'application/json',
            accept: 'application/json',
            authorization: `Basic ${authString}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);

        throw new ResponseError(
          error.response?.status || 500,
          'Failed to create transaction',
        );
      }

      throw error;
    }
  }

  static async sendToPaymentGateway(
    transactionId: string,
    grossAmount: number,
    transactionItems: any[],
    customerDetails: any,
    exchangeRate: number,
  ): Promise<any> {
    const authString = btoa(`${MIDTRANS_SECRET.MIDTRANS_SERVER_KEY}:`);
    let itemDetails = [];

    if (transactionItems[0].couponPackageId) {
      itemDetails = transactionItems.map(item => ({
        id: item.couponPackageId,
        price: item.amount * exchangeRate,
        quantity: 1,
        name: item.name,
      }));
    } else if (transactionItems[0].membershipTypeId) {
      itemDetails = transactionItems.map(item => ({
        id: item.membershipTypeId,
        price: item.amount * exchangeRate,
        quantity: 1,
        name: item.name,
      }));
    } else {
      throw new ResponseError(400, 'Invalid Transaction Request');
    }

    const transactionPayload = {
      transaction_details: {
        order_id: transactionId,
        gross_amount: grossAmount,
      },
      item_details: itemDetails,
      customer_details: {
        first_name: customerDetails.firstName,
        email: customerDetails.email ? customerDetails.email : '',
      },
      callbacks: {
        finish: `${clientUrl.PRODUCTION}/order-status?transaction_id=${transactionId}`,
        error: `${clientUrl.PRODUCTION}/order-status?transaction_id=${transactionId}`,
        pending: `${clientUrl.PRODUCTION}/order-status?transaction_id=${transactionId}`,
      },
    };

    try {
      const response = await axios.post(
        `${MIDTRANS_SECRET.MIDTRANS_APP_URL}/snap/v1/transactions`,
        transactionPayload,
        {
          headers: {
            contentType: 'application/json',
            accept: 'application/json',
            authorization: `Basic ${authString}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);

        throw new ResponseError(
          error.response?.status || 500,
          'Failed to create transaction',
        );
      }

      throw error;
    }
  }
}
