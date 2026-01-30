import Link from 'next/link';


import privacyStyles from '../styles/modulesStyles/privacypolicy.module.scss';
// import Navbar from '@/components/homePageComponents/Navbar';
import FooterSection from '@/components/homePageComponents/FooterSection';
import Navbar from '@/components/homePageComponents/Navbar';

const CookiePolicy = () => {

  return (
    <div className={privacyStyles.privacycontainer}>
      <Navbar />
      <div className="container container_bottom static-pages">
        <h1 className="heading">
          Cookie policy{' '}
        </h1>

        <div className="breadcrumb mt-5 mb-5">
          <p>
            <Link
              href="/"
              className='back_link me-1'
            >
              Home
            </Link>
            &gt;&gt; Cookie Policy
          </p>
        </div>
        <section className="mt-10 ">
          <h3>
            {' '}
            Your rights under this contract{' '}
          </h3>

          <p>
            Please read this cookie policy carefully before using Consumer
            Energy Solutions website.
          </p>

          <p/>
        </section>

        <section className="mt-10 ">
          <h3> What are cookies? </h3>

          <p>
            Cookies are simple text files that are stored on your computer or
            mobile device by a website’s server. Each cookie is unique to your
            web browser. It will contain some anonymous information such as a
            unique identifier, website’s domain name, and some digits and
            numbers.
          </p>

          <p/>
        </section>

        <section className="mt-10 ">
          <h3>
            {' '}
            What types of cookies do we use?{' '}
          </h3>

          <p>
            <b>
            Necessary cookies
            </b>
          </p>

          <p>
            Necessary cookies allow us to offer you the best possible experience
            when accessing and navigating through our website and using its
            features. For example, these cookies let us recognize that you have
            created an account and have logged into that account.
          </p>
          <p>
            <b>
            Functionality cookies
            </b>
          </p>
          <p>
            Functionality cookies let us operate the site in accordance with the
            choices you make. For example, we will recognize your username and
            remember how you customized the site during future visits.
          </p>
          <p>
            <b>
            Analytical cookies
            </b>
          </p>
          <p>
            These cookies enable us and third-party services to collect
            aggregated data for statistical purposes on how our visitors use the
            website. These cookies do not contain personal information such as
            names and email addresses and are used to help us improve your user
            experience of the website.
          </p>
        </section>

        <section className="mt-10 ">
          <h3> How to delete cookies?</h3>

          <p>
            If you want to restrict or block the cookies that are set by our
            website, you can do so through your browser setting. Alternatively,
            you can visit www.internetcookies.com, which contains comprehensive
            information on how to do this on a wide variety of browsers and
            devices. You will find general information about cookies and details
            on how to delete cookies from your device.
          </p>

          <p/>
        </section>
        <section className="mt-10 ">
          <h3> Contacting us</h3>

          <p>
            If you have any questions about this policy or our use of cookies,
            please contact us.
          </p>

          <p/>
        </section>
      </div>

      <FooterSection />

    </div>
  );
};

export default CookiePolicy;
