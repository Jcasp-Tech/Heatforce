import Link from 'next/link';
import privacyStyles from '../styles/modulesStyles/privacypolicy.module.scss';
import FooterSection from '@/components/homePageComponents/FooterSection';
import Navbar from '@/components/homePageComponents/Navbar';
// import Navbar from '@/components/homePageComponents/Navbar';

const PrivacyPolicy = () => {
  return (
    <div className={privacyStyles.privacycontainer}>

      <Navbar />
      <div className="container container_bottom static-pages">
        <h1 className="heading">
          {' '}
          Disclaimer & Privacy Policy
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
              &gt;&gt; Disclaimer & Privacy Policy
            </span>
          </p>
        </div>

        <section className="mt-10  mb-0">
          <p>

          </p>
          <p>
            <b>
              This is the Privacy Notice for Consumer Energy Solutions Limited.
            </b>
          </p>

          <p>
            <b>
              Registered address: Ffynnon Menter, Phoenix Way, Swansea, West Glamorgan, Wales, SA7 9HZ. Company Registration Number is: 09959339. Registered in England and Wales.
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

          </p>

          <h3> Introduction</h3>
          <p>
            This is a notice to inform you of our policy about all information that we record about you. It sets out the conditions under which we may process any information that we collect from you, or that you provide to us. We take your privacy very seriously and we ask that you read this privacy notice carefully as it contains important information on who we are, how and why we collect, store, use and share personal data, your rights in relation to your personal data and on how to contact us and supervisory authorities in the event you have a complaint.
          </p>
          <h3> What do we use your data for?</h3>
          <p>
            Consumer Energy Solutions Limited collects, uses and is responsible for certain personal information about you. We are required to comply with data protection regulation and we are responsible as a data controller. We are a marketing and surveying company and we use your data to connect you to funding that you may be entitled to under The Energy Company Obligation (ECO), which is a government energy efficiency scheme in Great Britain to help reduce carbon emissions and tackle fuel poverty.
          </p>
          <p>
            When we call you, we will always display a valid telephone number to identify us. You are always able to call this number back to prevent any future calls if you wish.
          </p>
          <h3> How do we process your data?</h3>
          <p>
            We process your data under Article 6(1) (f) of the General Data Protection Regulation (GDPR) 2018. This states that we use your data for legitimate interests. This includes using your data for telephone marketing for ourselves. You can request us to cease processing your data at anytime.
          </p>
          <h3> What types of data do we process?</h3>
          <p>
            The data we hold may consist of, but not be exclusive to names, addresses, phone numbers and e-mail addresses. If you are providing details of another person we expect you to ensure that they know you are supplying this information to us. We also recommend that they read this privacy notice and if they have concerns to contact us via our contact us section on our website.
          </p>
          <h3> Marketing</h3>
          <p>
            We may use personal data we hold about you to help identify and provide you with details of products and services from us that may be of interest to you. We have a legitimate reason to do so and will do so in accordance with any marketing preferences you have provided us. We may also provide you with details of products and services of third parties where there may be of interest to you.
          </p>
          <h3> Data retention</h3>
          <p>
            We will hold your data for 2 years, or as long as is necessary to comply with the audit requirements of the Energy Company Obligation scheme, or however long is compliant under other regulations. All of our calls are recorded and will be kept for 3 months or however long is compliant under other regulations.
          </p>
          <h3> Your rights (GDPR ARTICLE 13)</h3>
          <p>
            You have legal rights under data protection regulation to your personal data. These are set out below:
          </p>
          <ul>

            <li>
              <b>
                Right to be informed - {" "}
              </b>
              We will tell you what we are going to do with your data, primarily through this privacy policy and our Data Protection Statement.
            </li>

            <li>
              <b>
                Right of Access - {" "}
              </b>
              You have the right to request the details of the data we have about you and whether or not we have and are using your data.
            </li>

            <li>
              <b>
                Right of Rectification - {" "}
              </b>
              You have the right to ask us to rectify any of the data we hold if it is incorrect or incomplete.
            </li>

            <li>
              <b>
                Right of Erasure - {" "}
              </b>
              You have the right to request that we delete any, or all of the data we hold regarding you at any time. There are times we will not comply to this request (if it were to breach other legal or regulatory obligations), but you will be informed of this at the time.
            </li>


            <li>
              <b>
                Right to be informed - {" "}
              </b>
              This is the alternative of us erasing your data. We will keep your data on file, but it will not be used. This will prevent us from contacting you in the future.
            </li>


            <li>
              <b>
                Right to Data Portability - {" "}
              </b>
              You have the right to ask us to transfer your data to another company.
            </li>

            <li>
              <b>
                Right to Object - {" "}
              </b>
              You have the right to object to the processing of your data at any time. It will not affect any processing of your data up to that stage, but it will have immediate effect from when we receive that request.
            </li>

            <li>
              <b>
                Rights Regarding Automated Decision Making - {" "}
              </b>
              We will inform you if there is anytime we use automated decision making.
            </li>
            <li>
              <b>
                Right to Withdraw Consent - {" "}
              </b>
              You have the right to withdraw your consent to the processing of your data at any time and we will provide you with the information needed to do so.
            </li>
            <li>
              <b>
                Right to Lodge a Complaint with the Regulatory Body - {" "}
              </b>
              If you wish to make a complaint or are unhappy with the processing of your data, you can complain to the ICO on ico.org.uk
            </li>
          </ul>

          <p></p>
          <p>
            We may ask you for proof of identity when making a request to action any of these rights. We do this for your security to ensure we can disclose the relevant information.
          </p>
          <p>
            You do not have to give us permission to use your data, but no further transactions can take place between us if you do so.
          </p>
          <p>
            If you wish to carry out of any of the rights listed above or want anymore information regarding us and our Data Protection Policy, please contact our Data protection Officer (DPO) on: {" "}
            <a href="tel:01792721140" className='text-black text-decoration-none'>
              01792721140
            </a>
          </p>
          <p>
            All of the requests listed above will aim to be carried out within 1 month of receiving the request. It may however take us longer dependent on the nature of the request or if you have made a number of requests.
          </p>

          <h3> How to contact us</h3>

          <p>
            We will use the personal information you provide to us in accordance
            with the Data Protection Act 2018 ,General Data Protection
            Regulations and more specifically to:
          </p>

          <p>
            Please contact our data protection officer if you have any queries about this privacy policy or the information we hold about you.
          </p>

          <p>
            If you wish to contact our data protection officer, please send an email to DataProtection Officer@ces-limited.com or write to: Consumer Energy Solutions Limited, 1-6 Pocketts Wharf, Maritime Quarter, Swansea, West Glamorgan, Wales, SA1 3XL
          </p>
        </section>
      </div>
      <FooterSection />
    </div>
  );
};
export default PrivacyPolicy;
