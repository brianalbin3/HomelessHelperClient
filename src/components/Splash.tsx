import './Splash.css';


import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

// TODO: move typography font-weight: 400 to theme
function Splash() {
    return (
      <div className="landing-page-container">
        <div className="info-box">
          <Typography className="splash-header" color="primary" variant="h1">RoboNurse</Typography>
          <div className="description">Never forget to take your medicines again with our medicine reminder calls.</div>
          <Link className="no-underline" to="/features/medicine">
            <Button variant="contained" color="primary" className="start-btn">Get Started</Button>
          </Link>
        </div>
      </div>
    );
  }

  export default Splash;