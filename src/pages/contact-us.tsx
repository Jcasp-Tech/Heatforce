import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { DefaultSkeleton } from '@/components/theme';
import { InputField, TextAreaField } from '@/components/theme/form/formFieldsComponent';
import { contactUsAPI } from '@/redux/services/general.api';
import { AvailableRoofFormValidateSchema, AvailableRoofFormInputs  } from '@/schemas/availableFormSchema';

import ContactUsStyles from '../styles/modulesStyles/contactus.module.scss';
// import Navbar from '@/components/homePageComponents/Navbar';
import FooterSection from '@/components/homePageComponents/FooterSection';
import Navbar from '@/components/homePageComponents/Navbar';
import { zapprChatBotOpen } from '@/utils/helpers';
// import { show } from '@intercom/messenger-js-sdk';

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter()
  const params = useSearchParams();

  const { handleSubmit, formState, register, reset } =
    useForm<AvailableRoofFormInputs>({
      resolver: yupResolver(AvailableRoofFormValidateSchema),
      mode: 'onChange'
    });

  const onSubmit: SubmitHandler<AvailableRoofFormInputs> = async (
    data: any,
    e: any
  ) => {
    e.preventDefault();
    if (data) {
      setIsLoading(true);
      try {
        await contactUsAPI(data);
        setIsLoading(false);
        message.success(
          'Thank you! Your message has been successfully sent.We will contact you very soon!'
        );
        reset();
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log('router_router_', params.get("open-chat-bot"));
    if (params.get("open-chat-bot") === 'true') {
      // show()
      zapprChatBotOpen()
    }
  },[])

  return (
    <div className={ContactUsStyles.Contactcontainer}>
      <Navbar />
      <div>
        <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
          <div className="contact-form">
            <div className="position-relative">
              <div className=" col-lg-12 py-3 px-3">
                <div className="text-center">
                  <h2 className="modal-title mb-0 pe-4 me-1 fw-bold">
                    Contact us
                  </h2>
                </div>
                <div className="d-flex flex-column column-gap-3 formcontent mt-3">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3 d-flex flex-column">
                      <label
                        htmlFor="name"
                        className="form-label mb-1 fw-bold w-100 lh-sm"
                      >
                        Full name
                        {/* <span className="color-red">*</span> */}
                        <InputField
                          {...{
                            register,
                            formState,
                            type: 'text',
                            id: 'name',
                            // label: 'Enter Host First Name',
                            className: 'input-box w-100 ',
                            placeholder: 'example',
                          }}
                        />
                      </label>
                    </div>
                    <div className="mb-3 d-flex flex-column">
                      <label
                        htmlFor="email"
                        className="form-label mb-1 fw-bold w-100 lh-sm"
                      >
                        Email Address
                        {/* <span className="color-red">*</span> */}
                        <InputField
                          {...{
                            register,
                            formState,
                            id: 'email',
                            type: 'email',
                            className: 'input-box w-100',
                            // label: 'Enter Host First Name',
                            placeholder: 'example@email.com',
                          }}
                        />
                      </label>
                    </div>
                    <div className="mb-3 d-flex flex-column">
                      <label
                        htmlFor="phone"
                        className="form-label mb-1 fw-bold w-100 lh-sm"
                      >
                        Contact Number
                        <InputField
                          {...{
                            register,
                            formState,
                            type: 'number',
                            id: 'phone',
                            className: 'input-box w-100',
                            placeholder: '07717377777',
                          }}
                        />
                      </label>
                    </div>
                    <div className="mb-3 d-flex flex-column">
                      <label
                        htmlFor="notes"
                        className="form-label mb-1 fw-bold w-100 lh-sm"
                      >
                        Notes
                        {/* <span className="color-red">*</span> */}
                        <TextAreaField
                          {...{
                            register,
                            formState,
                            type: 'text',
                            id: 'notes',
                            // label: 'Enter Host First Name',
                            className: 'input-box w-100 notes',
                            placeholder: 'Notes',
                          }}
                        />
                      </label>
                    </div>
                    <div className="w-100 border-top d-flex justify-content-center align-items-center">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="saveButton text-dark fw-bold mt-4"
                      >
                        {isLoading && <DefaultSkeleton />} Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default ContactUs;
