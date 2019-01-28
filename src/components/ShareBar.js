import React, { Component } from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope, FaGooglePlus, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { ShareButtonRectangle, ShareBlockStandard } from 'react-custom-share';
var htmlToText = require('html-to-text');

const ShareComponent = props => {

  const shareBlockProps = {
    url: props.url,
    button: ShareButtonRectangle,
    buttons: [
      { network: 'Twitter', icon: FaTwitter },
      { network: 'Facebook', icon: FaFacebook },
      { network: 'GooglePlus', icon: FaGooglePlus },
      { network: 'Email', icon: FaEnvelope },
      { network: 'Linkedin', icon: FaLinkedin },
      {network: 'Pinterest', icon: FaWhatsapp, link: `https://api.whatsapp.com/send?text=${props.title} 
      ${props.url}`},
    ],
    text: props.title,
    longtext: htmlToText.fromString(props.description, {
      wordwrap: 130
    }),
  };

  return <ShareBlockStandard {...shareBlockProps} />;
};

class ShareBar extends Component {
 

  render() {

    return (ShareComponent(this.props));
  }
}

export default ShareBar;
