import { FormControl, FormHelperText, TextField } from '@mui/material';
import { SaveQuoteFormInputs, SaveQuoteFormValidateSchema } from '@/schemas/saveQuoteFormSchema';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import gsap from 'gsap';

import { updateUserInfoQuoteWebLeadDataAPI } from '@/redux/services/general.api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FinalFormDiv = ({ quoteData, setQuoteData, codeId, setLastForm, thankyouPage, setThankyouPage }) => {
  const [, setLoading] = useState(false)
  const router = useRouter()

  const { handleSubmit, formState: { errors }, register, setValue } =
    useForm<SaveQuoteFormInputs>({
      resolver: yupResolver(SaveQuoteFormValidateSchema),
    });
  const goToThankyouPage = () => {
    router.push('/thankyou')

    const container = document.getElementById('finalPageMainContainer');
    if (container === null) return
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth' // This makes the scroll smooth
    // });
    const thankyouContainer = document.getElementById('thankyouContainer')
    if (thankyouContainer === null) return
    const firstDiv: any = container.children[0];
    const secondDiv: any = container.children[1];
    if (firstDiv === undefined) return;
    if (secondDiv === undefined) return;

    setTimeout(() => {
      setThankyouPage(true)
      setLastForm(false)
      // container.scrollTo({
      //   left: secondDiv.clientWidth + firstDiv.clientWidth,
      //   behavior: 'smooth'
      // });
    }, 1000)
    setTimeout(() => {
      container.style.height = thankyouContainer.clientHeight + 'px'

    }, 1500)
  }
  const onSubmit = async (data: any) => {
    setLoading(true)
    const toastId = toast.loading('Saving Data, Please Wait!')
    try {
      await updateUserInfoQuoteWebLeadDataAPI({ randomstring: codeId, ...data, lead_status: "CONFIRM" })
      // reset();
      toast.success('Successfully Updated The Details!', { id: toastId })
      // setTimeout(() => { goToThankyouPage() }, 300)
      if (typeof window !== 'undefined') {

        localStorage.removeItem('saveQuotes')
        localStorage.removeItem('postcode')
      }
      setQuoteData((prev: any) => ({ ...prev, leadData: { ...prev.leadData, ...data } }))
      setTimeout(() => { goToThankyouPage() }, 1000)
    } catch (error) {
      toast.error('Error Occurred Please Try Again!', { id: toastId })
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    // console.log("quoteData.leadData.email", quoteData?.leadData?.email)
    if (quoteData?.leadData?.email) {
      setValue('email', quoteData.leadData.email);
    }
    if (quoteData?.leadData?.lastName) {
      setValue('lastName', quoteData.leadData.lastName);
    }
    if (quoteData?.leadData?.firstName) {
      setValue('firstName', quoteData.leadData.firstName);
    }
    if (quoteData?.leadData?.phone) {
      setValue('phone', quoteData.leadData.phone);
    }
    if (quoteData?.leadData?.title) {
      setValue('title', quoteData.leadData.title);
      //   setValue('firstName', quoteData.leadData.firstName);
    }
  }, [quoteData]);
  useEffect(() => {
    // default title value
    setValue('title', "Mr")
  }, [])

  let resizeTimeout;
  let windowWidth;
  const handleResize = () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    if (windowWidth && windowWidth == window.innerWidth) {
      return;
    }
    windowWidth = window.innerWidth;
    resizeTimeout = setTimeout(() => {
      const container = document.getElementById('finalPageMainContainer');
      if (container === null) { return }
      if (!thankyouPage) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth' // This makes the scroll smooth
        });
      }
      else {
        const firstDiv: any = container.children[0];
        const secondDiv: any = container.children[1];
        if (firstDiv === undefined) return;
        if (secondDiv === undefined) return;
        container.scrollTo({
          left: firstDiv.clientWidth,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [thankyouPage]);

  useEffect(() => {
    if (thankyouPage) {
      gsap.context(() => {
        const timeline = gsap.timeline()
        timeline.from('.thankyouText', {
          stagger: .4,
          opacity: 0,
          delay: 1
        })
          .from('.contentText', {
            opacity: 0,
            stagger: .4,
          })

      })
    }
  }, [thankyouPage])

  return (
    <div className="finalFormFormSubDiv-2">
      <div className="formMainHeading">
        < p className='formHeading' >Get in touch with us to explore your options</p>
        <span className='formSubHeading' style={{ fontWeight: "600" }}>To enquire further about this package or to explore a different tailored solution, please enter your contact details below. One of our solar experts will be in touch with you shortly.
        </span>
      </div>
      <form className="finalSubmissionForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="customTextField a">
          <FormControl fullWidth sx={{ border: 'none', outline: 'none' }}>
            <label htmlFor="Title">Title</label>

            <select
              style={{
                height: '42px',
                border: errors.title?.message ? '1px solid red' : 'none',
                borderRadius: '10px',
                boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
              }}
              className="form-control form-control-normal"
              aria-label="Select Title"
              id="title"
              {...register('title')}
            >
              <option value="" >Select Title *</option>
              <option value="Mr" selected >Mr.</option>
              <option value="Dr">Dr.</option>
              <option value="Miss">Miss</option>
              <option value="Mrs">Mrs</option>
              <option value="Professor">Professor</option>
              <option value="Lord">Lord</option>
              <option value="Reverend">Reverend</option>
              <option value="Lady">Lady</option>
              <option value="Canon">Canon</option>
              <option value="Sir">Sir</option>
              <option value="Judge">Judge</option>
              <option value="Captain">Captain</option>
              <option value="Colonel">Colonel</option>
              <option value="Pastor">Pastor</option>
              <option value="Father">Father</option>
            </select>
            <FormHelperText id="my-helper-text" className={errors.title?.message ? 'error-message' : ''}>{errors.title?.message || ""}</FormHelperText>
          </FormControl>
        </div>
        <div className="nameGrid a">
          <div className="nameTextFields">
            <FormControl sx={{ '& .MuiOutlinedInput-root': { height: "100%" } }} >
              <label htmlFor="firstName">First Name</label>
              <TextField id="firstName" sx={{
                "& fieldset": { border: errors.firstName?.message ? '' : 'none' },
                borderRadius: '8px', boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
              }} type='string' error={!!(errors.firstName?.message)} {...register("firstName")} size='small' style={{ height: '40px', borderColor: 'white', backgroundColor: 'white' }} aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text" className={errors.firstName?.message ? 'error-message' : ''}>{errors.firstName?.message || ""}</FormHelperText>
            </FormControl>
          </div>
          <div className="nameTextFields">
            <FormControl sx={{ '& .MuiOutlinedInput-root': { height: "100%" } }} >
              <label htmlFor="lastName">Last Name</label>
              <TextField id="lastName" sx={{
                "& fieldset": { border: errors.lastName?.message ? '' : 'none' },
                borderRadius: '8px', boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
              }} type='string' error={!!(errors.lastName?.message)}  {...register("lastName")} size='small' style={{ height: '40px', borderColor: 'white', backgroundColor: 'white' }} aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text" className={errors.lastName?.message ? 'error-message' : ''}>{errors.lastName?.message || ""}</FormHelperText>
            </FormControl>
          </div>

        </div>
        <div className="customTextField">
          <FormControl sx={{ '& .MuiOutlinedInput-root': { height: "100%" } }} className='a'>
            <label htmlFor="email">Email address</label>
            <TextField id="email" sx={{
              "& fieldset": { border: errors.email?.message ? '' : 'none' },
              borderRadius: '8px', boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
            }} type='string' error={!!(errors.email?.message)}  {...register("email")} size='small' style={{ height: '40px', borderColor: 'white', backgroundColor: 'white' }} aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text" className={errors.email?.message ? 'error-message' : ''}>{errors.email?.message || ""}</FormHelperText>
          </FormControl>
          <FormControl sx={{ '& .MuiOutlinedInput-root': { height: "100%" } }} className='a'>
            <label htmlFor="phone">Contact Number</label>
            <TextField id="phone" sx={{
              "& fieldset": { border: errors.phone?.message ? '' : 'none' },
              borderRadius: '8px', boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
            }} type='string' error={!!(errors.phone?.message)} {...register("phone")} size='small' style={{ height: '40px', borderColor: 'white', backgroundColor: 'white' }} aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text" className={errors.phone?.message ? 'error-message' : ''}>{errors.phone?.message || ""}</FormHelperText>
          </FormControl>
          {/* <FormControl className='a'>
        <label htmlFor="notes_comments">Notes, or comments</label>
    <TextareaAutosize id="notes_comments"   {...register("notes_comments")} style={{minHeight:'80px',borderRadius:'10px',borderColor:'white'}} aria-describedby="my-helper-text" />
    <FormHelperText id="my-helper-text" className={errors.notes_comments?.message ? 'error-message' : '' }>{errors.notes_comments?.message||"" }</FormHelperText>
  </FormControl> */}
        </div>
        <button type="submit" className='finalFormSubmitButton a fbqTrackLeadClick' >
          Submit my enquiry
        </button>
        <span className="finalFormBottomMessage a ">
          By entering your email address and submitting, you agree to our {' '}
          <Link className="link-underline-dark text-dark d-inline" href="/privacy-policy/" target='_blank'>privacy policy</Link>
          <span>
          </span>
        </span>
      </form>
    </div>
  )
}

export default FinalFormDiv