import Link from 'next/link';


import privacyStyles from '../styles/modulesStyles/privacypolicy.module.scss';
// import Navbar from '@/components/homePageComponents/Navbar';
import FooterSection from '@/components/homePageComponents/FooterSection';
import Navbar from '@/components/homePageComponents/Navbar';

const DepositGoodsAdvance = () => {

  return (
    <div className={`${privacyStyles.privacycontainer}`}>
      <Navbar  />
      <div className="container container_bottom  static-pages">
        <h1 className="heading">
        Deposits, Goods and Advance Payments{' '}
        </h1>

        <div className="breadcrumb mt-5 mb-5">
            <p>
          <Link
            href="/"
            className='back_link'
          >
            Home
          </Link>
          &gt;&gt; Deposits, goods and advance payments
          </p>
        </div>
        <section className="mt-10 d-flex  flex-column gap-2  ">
          <h3>
            {' '}
            Deposits, advance payments and goods purchased with deposits and advance payments{' '}
          </h3>

          <p>
          Any deposits and advance payments that you make to us can only be used to carry out work under this contract.
          </p>


          <p>
          We are required under the HIES Code of Practice to protect any deposits and advance payments you make to us, up to 25% or to the value of £5000, whichever is the lowest amount, as well as the Workmanship Warranty, with an insurance policy. We will give to you the name and contact details of this insurance company with the quotation. You will be entitled to claim on this policy should we fall into receivership, bankruptcy or administration.
          </p>

          

        

          <p>
          When we purchase goods for use under this contract the legal title to those goods or the proportion of which you have paid us for will pass to you. We will either deliver them to you or we will store them for you and mark them as your property. They will be kept separate from other goods. We will ensure that these goods are insured until they are delivered to you. You may make arrangements to inspect the goods or to remove them from our premises if you wish.
          </p>

          <p>
          If we have requested a deposit, then this deposit will not exceed 25% of the total contract price set out in the quotation. Should you decide to cancel this contract within the cancellation period, then this deposit will be returned to you promptly.
          </p>
          <p>
          [NOTE: HIES will not cover deposits or advance payments in excess of 25%].</p>
        
          <p>

          If we have requested advance payments in addition to a deposit, the total of all advance payments and deposits will not exceed 60% of the total contract price. We will not request advance payments to be made any more than 3 weeks from the agreed delivery or installation date.
          </p>
          <p>
          If we have requested a deposit before a full technical assessment of your property has been made, and we are unable to proceed because of something discovered during that technical inspection, then any deposits or advance payments will be returned.
          </p>
          <p>
          The quotation will set out in detail when invoices will be sent and the amounts due for each payment.
          </p>
        
        </section>

        <section className="mt-10 d-flex  flex-column gap-2 ">
          <h3>Goods belonging to us</h3>

          <p>
          Any goods belonging to us that have been delivered to you should remain clearly identifiable as our property. Until the title to the goods is transferred to you the goods should be stored in such a way as they are protected from damage. They should be kept in their original packaging. Should you fear for the safety of the goods in any way, or you feel that the goods are causing any form of hazard you should contact us.
          </p>

          <p>Where products and materials are delivered to, or stored at, the installation site you, the customer, shall not be liable for inspection, storage or handling of those goods. This does not preclude us asking you to check the goods received for any visible damage, and to ensure they are correct.</p>
          <p>Should you terminate the contract for any reason, then we will make arrangements with you to collect the goods. If this happens then we will reimburse you if any of your money was used to purchase a proportion of the goods. If you do not make adequate and reasonable arrangements with us to allow the goods to be collected, we retain the right to take legal proceedings to recover the goods or their value. The amount of any reimbursement may be reduced by any reasonable costs we may have incurred.</p>
        </section>
        
      </div>

      <FooterSection />

    </div>
  );
};

export default DepositGoodsAdvance;
