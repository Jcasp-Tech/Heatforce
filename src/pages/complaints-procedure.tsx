import Link from 'next/link';
import privacyStyles from '../styles/modulesStyles/privacypolicy.module.scss';
import FooterSection from '@/components/homePageComponents/FooterSection';
import Navbar from '@/components/homePageComponents/Navbar';
// import Navbar from '@/components/homePageComponents/Navbar';

const ComplaintsProcedure = () => {
  return (
    <div className={privacyStyles.privacycontainer}>

      <Navbar />
      <div className="container container_bottom static-pages">
        <h1 className="heading">
          {' '}
          Complaints procedure
        </h1>

        <div className="breadcrumb mt-5 mb-5">
          <p>
            <Link
              href="/"
              className='back_link'
            >
              Home
            </Link>
            &gt;&gt; Complaints procedure
          </p>
        </div>

        <section className="mt-10 mb-0">
          <h3 style={{ fontSize: '35px' }}> Complaints Contact Details</h3>
          <div className="d-flex flex-column gap-1 " style={{ marginBottom: "20px" }}>
            <p className="mb-0" >
              Name: Stephen Williams
            </p>
            <p className="mb-0">
              Telephone: {' '}
              <a href="tel:+01792722642" className='text-black text-decoration-none'>
                {/* 01792 721162 */}
                01792 722642
              </a>
            </p>
            <p>
              E-mail: {' '}
              <a href="mailto:solarshop@ces-limited.com" className='text-black text-decoration-none'>
                solarshop@ces-limited.com
              </a>
            </p>
            <p>
              If you&apos;re not completely happy with our service we&apos;d like to hear about it, that way we can put it right. We do everything we can to make sure our customers get the best products and the best service possible, however, sometimes we may not get things right first time. We want to:
            </p>
            <ul>
              <li>
                Make it easy for you to tell us what went wrong
              </li>
              <li>
                Give your complaint the attention it deserves
              </li>
              <li>
                Resolve your complaint fairly and without delay
              </li>
              <li>
                Make sure you are satisfied with how your complaint was handled How and where to complain
              </li>
            </ul>
            <p>
              If you are not satisfied with any aspect of our product/service you can tell us about your complaint in the following ways:
            </p>

            <ul>
              <li>
                In person: Head Office: 1-6 Pockets Wharf, Maritime Quarter, Swansea SA1 3XL
              </li>
              <li>
                In writing: Write to us at the address above, please address your letter to The Complaints Manager
              </li>
              <li>
                By Telephone: {' '}
                <a href="tel:01792 722642" className='text-black text-decoration-none'>
                01792 722642 {' '}
                </a>
                on option 4.
              </li>
              <li>
                By Email: {' '}
                <a href="mailto:solarshop@ces-limited.com" className='text-black text-decoration-none'>
                  solarshop@ces-limited.com {' '}
                </a>
               
              </li>
            </ul>
          <h3 style={{ fontSize: '35px' }}> How long will it take?</h3>
            <p>
              We will aim to resolve your complaint straight away but if we can&apos;t, we will write to you within 3 business days to tell you:
            </p>

            <ul>
              <li>
                Why we have not resolved your complaint
              </li>
              <li>
                Who is dealing with your complaint
              </li>
              <li>
                When we will contact you again
              </li>
              <li>
                We will usually resolve your complaint quickly, but if it is complex, it may take longer.
              </li>
              <li>
                We will keep you informed on a regular basis but if you need an update, please call us on the number above and ask to speak to the person dealing with your complaint.
              </li>
            </ul>
            <p>
              If your complaint is not resolved within the 3-business day period it will enter our formal complaints procedure.
            </p>

            <p>
              <strong>
                For complaints that relate to our credit broking service, {' '}
              </strong>
              we will provide you with a final response letter with 8 weeks, which will set out our position and confirm whether we accept your complaint or not. We hope at this stage the matter will be resolved but if you remain unsatisfied, following receipt of our final response letter, or 8 weeks have passed and you have not received a response from us, you may have the right to refer your complaint to the Financial Ombudsman Service (FOS).
            </p>

            <p>
              If for any reason, we are not able to provide our final response within 8 weeks, we will send a letter giving our reasons for the delay and an indication of when we expect to provide a final decision.
            </p>

            <p>
              If you want the FOS to investigate your complaint you must contact them within six months of the date of our final response letter, Financial Ombudsman Service, Exchange Tower, London E14 9SR. Telephone: {' '}

              <a href="tel:08000234567" className='text-black text-decoration-none'>
                0800 0234567
              </a>
              ;
              Email: {' '}
              <a href="mailto:complaint.info@financial-ombudsman.org.uk" className='text-black text-decoration-none'>
                complaint.info@financial-ombudsman.org.uk {' '}
              </a>

              Further helpful information can be obtained from visiting their web site at: {' '}

              <a href="https://www.financial-ombudsman.org.uk" className='text-black text-decoration-none'>
                www.financial-ombudsman.org.uk
              </a>
            </p>
          </div>

          <h3 style={{ fontSize: '35px' }}>Our Procedures</h3>
          <p>Any complaint verbal or written will be referred to our complaint&apos;s manager at the earliest opportunity or to
            a member of the senior management if the complaints manager is unavailable. We will also</p>
          <ul>
            <li>
              Acknowledge the complaint in writing promptly
            </li>

            <li>
              Record details on the firm&apos;s system
            </li>

            <li>
              Make contact to seek clarification on any points where necessary
            </li>

            <li>
              Fully investigate the complaint
            </li>

            <li>
              Keep you informed of our progress
            </li>

            <li>
              Discuss with you our findings and proposed response
            </li>

            <li>
              Ensure that our firm partners have a compliant complaints procedure and are communicating with customer using this
            </li>

            <li>
              Provide clear deadlines to respond
            </li>
          </ul>
          <p>
            You will receive contact from us advising on progress if we cannot respond immediately. We will let you have our final response as soon as possible and not later than eight weeks.
          </p>
          <section>
            <h3 style={{ fontSize: '35px' }}> Consumer Energy Solutions</h3>
            <p>
              Customers may express dissatisfaction to us about our products and services. We will need to establish whether or not the complaint relates to the information given, the firm or the service and installation. If unclear, this must not delay investigation and we will proceed with our own investigation. The complaints manager will review this matter and take the complaint to the firm for them to investigate and provide a written explanation and any supporting information. This may include photos, checklists, or remedial satisfaction notes.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '35px' }}>Investigation</h3>
            <p>The complaints manager will establish the nature and scope of the complaint having due regards to the Financial Conduct Authority{`'`}s direction:</p>
            {/* <ul>
              <li>
                Deal with complaints promptly and fairly
              </li>
              <li>
                Give complainants clear replies and, where appropriate, fair redress
              </li>
              <li>
                We may take up to 8-weeks to provide a response
              </li>
            </ul> */}
            <p>
              Deal with complaints promptly and fairly
              <br />
              Give complainants clear replies and, where appropriate, fair redress
              <br />
              We may take up to 8-weeks to provide a response
            </p>
          </section>
          <section>
            <h3 style={{ fontSize: '35px' }}>Eligible Complainants</h3>
            <p>It is the firm&apos;s policy to treat all complainants the same, however, eligible complainants, customers that have purchased goods and services using a lenders finance, are legally defined and have additional rights in law that we must acknowledge and adhere to.</p>
            <p>The Financial Conduct Authority complaints rules apply to complaints:</p>
            <ul>
              <li>
                Made by, or on behalf of an eligible complainant.
              </li>
              <li>
                Relating to regulated activity.
              </li>
              <li>
                Involving an allegation that the complainant has suffered, or may suffer, financial loss, material distress material inconvenience.
              </li>
            </ul>
          </section>
          <section>
            <h3 style={{ fontSize: '35px' }}>Final response</h3>
            <p>This will set out clearly our decision and the reasons for it. If any compensation is offered a clear method of calculation will be shown.
            </p>
            <p>The firm must include details of the Financial Ombudsman Service in the final response if dealing with an eligible complainant and a regulated activity, we will:</p>
            <ul>
              <li>
                Explain that the complainant must refer the matter to the ombudsman within six months of the date of the final response letter or the right to use this service is lost.
              </li>
              <li>
                Indicate whether or not we consent to waive the relevant time limits.
              </li>
            </ul>
          </section>
          <section>
            <h3 style={{ fontSize: '35px' }}>Complaints Settled within 3 business days</h3>
            <p>Complaints that can be settled to the customer&apos;s satisfaction within 3 business days can be recorded and communicated differently.
            </p>
            <p>{`Where we consider a complaint to be resolved to the customer's satisfaction under this section, the firm will promptly send a 'Summary Resolution Communication', being a written communication from them which:`}</p>
            <ol>
              <li>
                refers to the fact that the customer has made a complaint and informs them that they now consider the complaint to have been resolved to the customers satisfaction.
              </li>
              <li>
                {` The firm will tell the customer that if they subsequently decide that they are dissatisfied with the resolution of the complaint they may be able to refer the complaint back to the firm for further consideration or alternatively refer the complaint to the Financial Ombudsman Service;`}
              </li>
              <li>
                {` Provide the website address of the Financial Ombudsman Service; and`}
              </li>
              <li>Refer to the availability of further information on the website of the Financial Ombudsman Service.

              </li>
            </ol>
            {/* <p>In addition to sending you a Summary Resolution Communication, the firm may also use other methods to communicate the information where:</p>
            <ol>
              <li>
                {`We consider that doing so may better meet the customer's needs; or`}
              </li>
              <li>
                {` They have already been using another method to communicate about the complaint. This may include recorded calls, emails or text messages.`}
              </li>
            </ol> */}
          </section>
          {/* <section>
            <h3 style={{ fontSize: '35px' }}>Closing a complaint</h3>
            <p>We will consider a complaint closed when we have made our final response to the customer. This does not prevent a customer from exercising any rights they may have to refer the matter to the Financial Ombudsman Service.
            </p>

          </section>

          <section>
            <h3 style={{ fontSize: '35px' }}>Financial Ombudsman Service</h3>
            <p>We will co-operate fully with the Ombudsman in resolving any complaints made against us and agree to be bound by any awards made by the Ombudsman. The firm undertakes to pay promptly any fees levied by the Ombudsman.
            </p>

          </section>


          <section>
            <h3 style={{ fontSize: '35px' }}>How Long You Have to Complain to the Financial Ombudsman Service</h3>
            <p>{`You have the right to refer your complaint to the Financial Ombudsman Service, free of charge - but you must do so within six months of the date the final response letter.`}
            </p>
            <p>{`If you do not refer your complaint in time, the Ombudsman will not have our permission to consider your complaint and so will only be able to do so in very limited circumstances. For example, if the Ombudsman believes that the delay was as a result of exceptional circumstances.`}</p>
          </section>
          <section>
            <h3 style={{ fontSize: '35px' }}>Contact</h3>
            <p>The Financial Ombudsman Service, Exchange Tower, London E14 9SR</p>

            <p>

              <a href="tel:08000234567" className='text-black text-decoration-none'> Tel: 0800 023 4567</a>{` (free for most people ringing from a fixed line) or `}
              <a href="tel:03001239123" className='text-black text-decoration-none'>  0300 123 9123</a>{` (cheaper for those calling using a mobile) or `}
              <a href="tel:02079640500" className='text-black text-decoration-none'>
                {" "} 020 7964 0500 </a>{` (if calling from abroad)`}</p>
            <p>

              <a href="mailto:complaint.info@financial-ombudsman.org.uk" className='text-black text-decoration-none'>

                Email: complaint.info@financial-ombudsman.org.uk

              </a>
              <a href="www.financial-ombudsman.org.uk" className='text-black text-decoration-none'>
                {`  Website: www.financial-ombudsman.org.uk`}
              </a>
            </p>
          </section> */}

        </section>
      </div>
      <FooterSection />
    </div>
  );
};
export default ComplaintsProcedure;
