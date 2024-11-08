import React, { useRef } from 'react';

// import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';

import styles from '../../scss/payments.module.scss';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = 'HX2YcEWy8Ds7IJ23tpaot';

interface PaymentsProps {
  payValue: number;
  paymentModalClose: () => void;
}

const Payments: React.FC<PaymentsProps> = ({ payValue, paymentModalClose }) => {
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
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 쿠폰 체크박스 */}
        {/* <div>
          <div>
            <label htmlFor="coupon-box">
              <input
                id="coupon-box"
                type="checkbox"
                aria-checked="true"
                disabled={!ready}
                onChange={event => {
                  // ------  주문서의 결제 금액이 변경되었을 경우 결제 금액 업데이트 ------
                  setAmount(
                    event.target.checked ? amount - 5_000 : amount + 5_000,
                  );
                }}
              />
              <span>5,000원 쿠폰 적용</span>
            </label>
          </div>
        </div> */}

        {/* 결제하기 버튼 */}
        <button
          className={styles.button}
          disabled={!ready}
          onClick={async () => {
            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
              await widgets.requestPayment({
                orderId: 'E1qvCyT44kXF5pmwcFXE7',
                orderName: '토스 티셔츠 외 2건',
                successUrl: window.location.origin + '/success',
                failUrl: window.location.origin + '/fail',
                customerEmail: 'customer123@gmail.com',
                customerName: '김토스',
                customerMobilePhone: '01012341234',
              });
            } catch (error) {
              // 에러 처리하기
              console.error(error);
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
