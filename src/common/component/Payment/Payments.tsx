import React, { useRef } from 'react';

// import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cancel from '../image/cancel.svg';

import styles from '../../scss/payments.module.scss';
import { PaymentRequestDto } from './dto/request.dto';
import { postTempReqPay } from '../../../apis/api/user.api';

const clientKey = `${import.meta.env.VITE_TOSS_CLIENT_KEY}`;
const customerKey = uuidv4();

interface PaymentsProps {
  payValue: number;
  paymentModalClose: () => void;
  orderName: string;
  banana: number;
}

const Payments: React.FC<PaymentsProps> = ({
  payValue,
  paymentModalClose,
  orderName,
  banana,
}) => {
  const paymentModalRef = useRef<HTMLDivElement>(null);

  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: 50_000,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<any | null>(null);

  useEffect(() => {
    if (payValue) {
      setAmount({
        currency: 'KRW',
        value: payValue,
      });
    }
  }, [payValue]);

  useEffect(() => {
    const fetchPaymentWidgets = async () => {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });
      // 비회원 결제
      //   const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    };

    if (widgets == null) {
      fetchPaymentWidgets();
    }
  }, [clientKey, customerKey]);

  useEffect(() => {
    const renderPaymentWidgets = async () => {
      if (widgets == null) {
        return;
      }

      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    };

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(amount);
  }, [widgets, amount]);

  // 화면 밖 클릭 시 모달 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        paymentModalRef.current &&
        !paymentModalRef.current.contains(event.target as Node)
      ) {
        paymentModalClose();
      }

      //   if (
      //     regionDropdownRef.current &&
      //     !regionDropdownRef.current.contains(event.target as Node)
      //   ) {
      //     setRegionDropdownOpen(false);
      //   }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.box_section} ref={paymentModalRef}>
        <div className={styles.header}>
          <img
            src={Cancel}
            alt=""
            width="30px"
            height="30px"
            onClick={paymentModalClose}
          ></img>
        </div>
        <div id={styles.productInfo}>
          <div className={styles.title}>상품 정보</div>
          <div className={styles.orderName}>{orderName}</div>
        </div>
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />

        {/* 결제하기 버튼 */}
        <button
          className={styles.button}
          disabled={!ready}
          onClick={async () => {
            try {
              const orderId = uuidv4();
              const reqData: PaymentRequestDto = {
                orderId,
                amount: amount.value,
                banana,
              };

              const res = await postTempReqPay(reqData);

              console.log(res);

              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
              await widgets.requestPayment({
                orderId,
                orderName,
                successUrl: window.location.origin + '/success',
                failUrl: window.location.origin + '/fail',
                customerEmail: 'customer123@gmail.com',
                customerName: '김토스',
                customerMobilePhone: '01012341234',
              });
            } catch (error: any) {
              // 에러 처리하기
              // console.error(error);
              // if (error.code === 'USER_CANCEL') {
              //   console.log('cancel');
              // }

              if (error.code === 'INVALID_CARD_COMPANY') {
                console.log('Inval');
              }
            }
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default Payments;
