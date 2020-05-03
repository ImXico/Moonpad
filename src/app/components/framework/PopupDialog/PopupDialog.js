// import React from 'react';
// import PropTypes from 'prop-types';
// import './styles.scss';

// const PopupDialog = ({ headerText, children, primaryActionLabel, onPrimaryActionClick }) => {
//   return (
//     <div className="PopupDialog">
//       <p className="PopupDialog--HeaderText">{headerText}</p>
//       {children}
//       <button
//         className="PopupDialog--ButtonCancel"
//         onClick={() => console.log("Cancel clicked!")}
//       >
//         Cancel
//       </button>
//       <button
//         className="PopupDialog--ButtonPrimary"
//         onClick={() => onPrimaryActionClick()}
//         >
//           {primaryActionLabel}
//       </button>
//     </div>
//   );
// }

// PopupDialog.propTypes = {
//   headerText: PropTypes.string.isRequired,
//   primaryActionLabel: PropTypes.string.isRequired,
//   onPrimaryActionClick: PropTypes.func.isRequired
// }

// export default PopupDialog;