import React, { Fragment, useState } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components"; 
import Reaptcha from 'reaptcha'; //Reference for Recaptcha - https://github.com/sarneeh/reaptcha

// You'll need some polyfilled fetching library, 
// if thats your jam.  In addition, something to easily
// grab cookies from the browser. 

import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';

/********* Themed Styles for labels, inputs and buttons inhertited from the theme defined in the importing component **********/

const Label = styled.label `
    text-transform: uppercase;
    font: ${ props => props.theme.labelFont || "600 0.875rem/1.125rem Open Sans"};
    color: ${ props => props.theme.labelColor || "#898989"};
    margin: ${ props => props.theme.labelMargin || "0 0.5rem 0 0"};
    padding: ${ props => props.theme.labelPadding };
    border-radius: ${ props => props.theme.labelBorderRadius };
    border: ${ props => props.theme.labelBorder };
    background-color: ${ props => props.theme.labelBackground || "#fff" };
  `;


const Input = styled.input `
    font: ${ props => props.theme.inputFont };
    color: ${ props => props.theme.inputColor };
    margin: ${ props => props.theme.inputMargin };
    padding: ${ props => props.theme.inputPadding };
    border-radius: ${ props => props.theme.inputBorderRadius };
    border: ${ props => props.theme.inputBorder };
    background-color: ${ props => props.theme.inputBackground };
  `;

  const Select = styled.select `
    font: ${ props => props.theme.selectFont };
    color: ${ props => props.theme.selectColor };
    margin: ${ props => props.theme.selectMargin };
    padding: ${ props => props.theme.selectPadding };
    border-radius: ${ props => props.theme.selectBorderRadius };
    border: ${ props => props.theme.selectBorder };
    background-color: ${ props => props.theme.selectBackground };
  `;

const Button = styled.button `
font: ${ props => props.theme.buttonFont };
color: ${ props => props.theme.buttonColor };
margin: ${ props => props.theme.buttonMargin };
padding: ${ props => props.theme.buttonPadding };
border-radius: ${ props => props.theme.buttonBorderRadius };
border: ${ props => props.theme.buttonBorder };
background-color: ${ props => props.theme.buttonBackground };

`;

// Main graphql query to import all HubSpot forms on the account.

const contactQuery = graphql `

  {
  allHubspotForm {
    edges {
      node {
        guid
        portalId
        name
        submitText
        formFieldGroups {
          fields {
            name
            label
            type
            fieldType
            description
            groupName
            displayOrder
            required
            enabled
            hidden
            defaultValue
            isSmartField
            unselectedLabel
            placeholder
            labelHidden
            propertyObjectType
            objectTypeId
            options {
              description
              displayOrder
              doubleData
              hidden
              label
              readOnly
              value
            }
          }
        }
      }
    }
  }}`
;

// Main component
export default function HsForm(props) {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const data = useStaticQuery( contactQuery );

  const [verified, setVerified] = useState(false);

  console.log("verified before : ",verified);

  const onVerify = recaptchaResponse => {
    setVerified(true);
    console.log("verified after : ",verified);
  };

  // Filtering all HubSpot forms received using useStaticQuery hook based on passed in formId prop.
  const currentForm = data.allHubspotForm.edges.filter( edge => edge.node.guid === props.formId );

  console.log(currentForm);

  const submitForm = e => {
    if (e) e.preventDefault();

    const answers = [...e.target.elements].map( field => { 
      if( field.type === "checkbox" ) return { name: field.name, value: field.checked }
      else return { name: field.name, value: field.value }    
    } );
		
		// In Gatsby, we're building our static site in a Node
		// environment, rather than a browser environment, so anything
		// browser related needs to be wrapped in some version of the
		// following isBrowser variable. 
		
		// What we're getting here is some contextual data to send 
		// along to Hubspot so it can organize and track forms as 
		// they relate to specific users in the CRM.  The Hubspot 
		// plugin we installed earlier provides this hutk value as a cookie.
		// pageName & pageUri should be pretty self explanatory. 
		
    const isBrowser = typeof window !== 'undefined';
    const hutk = isBrowser ? Cookies.get('hubspotutk') : null;
    const pageUri = isBrowser ? window.location.href : null;
    const pageName = isBrowser ? document.title : null;
    const postUrl = `${"https://api.hsforms.com/submissions/v3/integration/submit"}/${currentForm[0].node.portalId}/${currentForm[0].node.guid}`;

    setLoading(true);
		
		// This object shape is what's required in the Hubspot API 
		// documentation.  There's an additional legalConsentOptions object 
		// I've left out here, but would be important if you're working on a 
		// legitimate organization's site & they want to be safe from any sort 
		// of GDPR guff. 
		//
		// Read more here:
		// https://developers.hubspot.com/docs/methods/forms/submit_form_v3

    const body = {
      submittedAt: Date.now(),
      
      fields: answers,
      context: {
        hutk,
        pageUri,
        pageName,
      },
    };

		// These specific headers are required for whatever reason,
		// so don't forget to include them. 
		
    fetch(postUrl, {
      method: 'post',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      }),
    })
      .then(res => res.json())
      .then(() => {
        setSuccess(true);
        setError(false);
        setLoading(false);
        // setFirstname('');
        // setLastname('');
        // setEmail('')
      })
      .catch(err => {
        setSuccess(false);
        setError(err);
        setLoading(false);
      });
  };
	
	// Finally, the data-form-id and data-portal-id attributes 
	// don't actually do anything for us in terms of getting our 
	// data from A to B.  However, if these aren't included on the 
	// form element, Hubspot gets a little confused when labelling 
	// submissions in the dashboard, so be sure to include these attrs 
	// if you don't want your submission names looking like styled-component
	// class names a la "New Submission from Contact__Form__xydhf2_kskl"

  

  return (
      <div>
        <form
          data-form-id={currentForm[0].node.guid}
          data-portal-id={currentForm[0].node.portalId}
          disabled={loading}
          onSubmit={submitForm}
        >
          {success && (
            <div>
              <p>{currentForm.formSuccessMessage}</p>
            </div>
          )}
          {!success && (
            <Fragment>
                    { currentForm[0].node.formFieldGroups.map( group => group.fields.map ( field =>
                    ( field.fieldType !== "checkbox" && field.fieldType !== "select" ) ?
                    <div key={field.name}>
                      <Label htmlFor={ `${currentForm[0].node.name}-${field.name}` } name={field.label}>{field.label}</Label>
                      <Input id={ `${currentForm[0].node.name}-${field.name}` } name={field.name} type={ !field.hidden ? ( field.fieldType === "booleancheckbox" ? "checkbox" : field.fieldType ) : "hidden" } label={field.label} required={field.required} placeholder={field.placeholder}></Input>
                    </div>
                    :
                    <div key={field.name}>
                      <Label htmlFor={ `${currentForm[0].node.name}-${field.name}` } name={field.label}>{field.label}</Label>
                      {field.fieldType === "select" && 
                      <Select id={ `${currentForm[0].node.name}-${field.name}` }>
                          { field.options.map( option =>
                            <Fragment key={option.label}>
                              <option value={option.label}>{option.label}</option>
                            </Fragment>
                          ) }

                      </Select>
                    }
                    { field.fieldType === "checkbox" &&
                        field.options.map( option =>
                        <React.Fragment key={option.displayOrder}>
                          <Label>{option.label}</Label>
                          <Input type={field.fieldType}></Input>
                        </React.Fragment>

                        )
                    }
                    
                    </div>
                ) ) }

              {error && (
                <div>
                  <p>{currentForm[0].node.formErrorMessage}</p>
                </div>
              )}
              <Reaptcha sitekey="6LeI58gfAAAAAPg360zF8Fxt6k7t4eWqaoSBtjG6" onVerify={onVerify} />
              <Button type="submit" disabled={!verified}>
                Send
              </Button>
            </Fragment>
          )}
        </form>
      </div>
  );
}
