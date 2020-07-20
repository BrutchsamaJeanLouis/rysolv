import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { textColor } from 'defaultStyleHelper';

const Monocle = props => (
  <SvgIcon viewBox="0 0 450 375" {...props}>
    <g
      transform="translate(0.000000,480.000000) scale(0.110000,-0.110000)"
      fill={textColor}
      stroke={textColor}
    >
      <path
        d="M1846 4304 c-250 -45 -484 -170 -672 -358 -191 -191 -314 -425 -359
-680 -20 -115 -20 -337 0 -452 45 -256 168 -488 359 -680 191 -191 425 -314
680 -359 115 -20 337 -20 452 0 240 42 478 163 657 334 195 187 336 445 378
694 l13 77 270 0 c253 0 273 1 304 20 48 30 72 75 72 140 0 65 -24 110 -72
140 -31 19 -51 20 -304 20 l-270 0 -13 77 c-42 249 -183 507 -378 694 -179
171 -417 292 -657 334 -111 19 -351 19 -460 -1z m399 -325 c121 -20 270 -81
375 -152 66 -45 186 -163 235 -232 77 -109 132 -234 160 -368 17 -80 20 -268
4 -353 -34 -197 -132 -377 -280 -520 -187 -179 -401 -265 -659 -265 -258 0
-472 86 -659 265 -195 188 -291 414 -291 686 0 272 96 498 291 686 85 81 136
118 234 166 186 93 383 122 590 87z"
      />
      <path
        d="M3752 2700 c-48 -30 -72 -75 -72 -140 0 -100 60 -160 160 -160 100 0
160 60 160 160 0 100 -60 160 -160 160 -37 0 -66 -6 -88 -20z"
      />
      <path
        d="M3752 2220 c-48 -30 -72 -75 -72 -140 0 -100 60 -160 160 -160 100 0
160 60 160 160 0 65 -24 110 -72 140 -45 27 -131 27 -176 0z"
      />
      <path
        d="M3752 1740 c-48 -30 -72 -75 -72 -140 0 -100 60 -160 160 -160 100 0
160 60 160 160 0 65 -24 110 -72 140 -45 27 -131 27 -176 0z"
      />
    </g>
  </SvgIcon>
);

export default Monocle;
