import Link from 'next/link';
import privacyStyles from '../styles/modulesStyles/privacypolicy.module.scss';
import FooterSection from '@/components/homePageComponents/FooterSection';
import Navbar from '@/components/homePageComponents/Navbar';
// import Navbar from '@/components/homePageComponents/Navbar';

const CancellationPolicy = () => {
  return (
    <div className={privacyStyles.privacycontainer}>

      <Navbar />
      <div className="container container_bottom static-pages">
        <h1 className="heading">
          {' '}
          Cancellation Policy
        </h1>

        <div className="breadcrumb mt-5 mb-5">
          <p>
            <Link
              href="/"
              className='back_link me-1'
            >
              Home
            </Link>
            <span>
              &gt;&gt; Cancellation Policy
            </span>
          </p>
        </div>

        <section className="mt-10  mb-0">
          {/* <p>

          </p>
          <p>
            <b>
              This is the Privacy Notice for Consumer Energy Solutions Limited.
            </b>
          </p>

          <p>
            <b>
              Registered address: The Third Floor, Langdon House Langdon Road, Swansea Waterfront, Swansea, West Glamorgan, Wales, SA1 8QY
            </b>
          </p>

          <p>
            <b>
              Company Registration Number is: 09959339
            </b>
          </p>

          <p>
            <b>
              Tel: {" "}
              <a href="tel:01792721140" className='text-black text-decoration-none'>
                <b>
                  01792 721 140
                </b>
              </a>
            </b>
          </p>

          <p>
            <b>
              E-mail - {" "}
              <a href="mailto:solarshop@ces-limited.com" className='text-black text-decoration-none'>
                <b>
                  solarshop@ces-limited.com
                </b>
              </a>
            </b>
          </p>

          <p>
            <b>
              We are registered with the Information Commissioners Office (ICO) Regulatory number: ZA387531
            </b>
            <b>
              We are a data controller of any data we hold and gather. We receive data from a number of data providers. A full list is available on request.
            </b>

          </p> */}

          <h3> Your rights under this contract </h3>
          <p>
            The &apos;Cancellation Period&apos; begins when the contract is agreed and will end 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good.
          </p>
          <p>
            You have the right to cancel this contract during the cancellation period without giving any reason.
          </p>
          <p>
            To exercise the right to cancel, you must inform us of your decision to cancel this contract by a clear statement (e.g. a letter sent by post, fax or e-mail). You may use the Cancellation Form we have supplied but it is not obligatory.

          </p>
          <p>
            To meet the cancellation deadline, it is sufficient for you to send your communication concerning your exercise of the right to cancel before the cancellation period has expired.
          </p>
          <p>
            You may also cancel this contract if there is an unreasonable delay in the installation being carried out, if this has not been caused by you. You would also be entitled to a full refund if that delay has been caused by something outside of our direct control but not caused by you.

          </p>
          <p>
            if you cancel this contract outside the cancellation period you may have to pay to us reasonable costs for any losses we may have incurred. We will attempt to keep these costs to a minimum. If you have paid us a deposit or any advance payments, we may retain all or part of these payments as a contribution.

          </p>

          <p>
            You will be entitled to cancel this contract if there is a serious delay in our ability to carry out the agreed work that is outside of your control, but within our control, you will be entitled to a full refund.

          </p>
          <p>
            If we are in serious breach of our obligations as detailed in this contract then you will be entitled to cancel this contract, request a repair or replacement or you may be entitled to request compensation.

          </p>
          <p>

            You can only recourse to these actions if the goods or services are incorrectly described or not fit for purpose. You will not be entitled to seek these remedies if you have changed your mind about the goods and services agreed to.

          </p>
          <h3> Effects of cancellation</h3>

          <p>
            If you cancel this contract, we will reimburse to you all payments received, including the costs of delivery (except for the supplementary costs arising if you chose a type of delivery other than the least expensive type of standard delivery offered by us).
          </p>
          <p>
            We may make a deduction from the reimbursement for loss in value of any goods supplied, if the loss is a result of unnecessary handling by you.
          </p>

          <p>
            We will make the reimbursement without undue delay, and not later than:
          </p>

          <p>
            a) 14 days after the day we receive back from you any goods supplied, or
          </p>
          <p>
            b) (if earlier) 14 days after the day you provide evidence that you have returned the goods,
          </p>
          <p>
            c) or - If there were no goods supplied, 14 days after the day on which we are informed about your decision to cancel this contract.
          </p>

          <p>
            We will make the reimbursement using the same means of payment as you used for the initial transaction, unless you have expressly agreed otherwise; in any event, you will not incur any fees as a result of the reimbursement.
          </p>
          <p>
            We will collect the goods at our expense. You are only liable for any diminished value of the goods resulting from the handling other than what is necessary to establish the nature, characteristics and functioning of the goods.
          </p>
          <h3> Work begun prior to the expiry of the cancellation period</h3>

          <p>
            If you have agreed in writing that installation work will commence before the cancellation period expires, and you subsequently cancel in accordance with your rights, you are advised that reasonable payment may be due for any work carried out. You must confirm in writing that work may commence before your cancellation period expires.
          </p>

          <p>
            You will be entitled to cancel this contract if there is a serious delay in our ability to carry out the agreed work that is outside of your control, but within our control. You will be entitled to a full refund.

          </p>
          <p>
            If we are in serious breach of our obligations as detailed in this contract then you will be entitled to cancel this contract, request a repair or replacement or you may be entitled to request compensation.

          </p>
          <p>

            You can only recourse to these actions if the goods or services are incorrectly described or not fit for purpose. You will not be entitled to seek these remedies if you have changed your mind about the goods and services agreed to outside of any required cancellation periods.
          </p>

          <h3> Related credit and other agreements</h3>
          <p>
            If you decide to cancel your contract for our goods and services, then any credit agreement and any other ancillary contracts related to the main contract will be automatically cancelled.

          </p>
          <h3> Our rights under this contract</h3>
          <p>
            If, within fourteen days of us informing you in writing of a serious breach of your obligations to us you have failed to rectify this breach, we will have the right to cancel this contract.
          </p>

          <p>
            Should we suffer any losses due to a breach of this contract then we will be entitled to reasonable compensation to cover these losses. We are required to attempt to keep all losses to a minimum.
          </p>
        </section>
      </div>
      <FooterSection />
    </div>
  );
};
export default CancellationPolicy;
