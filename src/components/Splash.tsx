import './Splash.css';


import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

// TODO: move typography font-weight: 400 to theme
function Splash() {
    return (
      <div className="landing-page-container">
        <div className="info-box">
          <Typography className="splash-header" color="primary" variant="h1">Homeless Helper</Typography>
          <div className="description">Helping you organize your missionary work for the homeless one page at a time.</div>
          <Link className="no-underline" to="/features/schedule">
            <Button variant="contained" color="primary" className="start-btn">Get Started</Button>
          </Link>
        </div>
      </div>
    );
  }

  export default Splash;