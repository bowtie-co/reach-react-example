import React from "react";
import PropTypes from "prop-types";
import { Button } from 'reactstrap';
// import IconButton from "@material-ui/core/IconButton";
// import { FontIcon } from "../../atoms";


export const CustomButton = ({
	name, type, disabled, plain, outline, rounded, onClick, active, iconOnly, iconTop,
	iconRight, iconName, iconBadge, size, color, place, btnSize, btnColor, iconBtn, subname
}) => {
	let btnClass = "";
	const tempArray = [];
	if (active) {
		tempArray.push("active");
	}
	if (disabled) {
		tempArray.push("disabled-btn");
	}
	if (plain) {
		tempArray.push("trs-btn");
	}
	if (outline) {
		tempArray.push("outline-btn");
	}
	if (rounded) {
		tempArray.push("rounded-btn");
	}
	if (iconBtn) {
		tempArray.push("iconBtn");
	}
	if (iconTop) {
		tempArray.push("iconTop");
	}
	if (iconRight) {
		tempArray.push("iconRight");
	}
	if (btnSize !== "") {
		tempArray.push(btnSize);
	}
	if (btnColor !== "") {
		tempArray.push(btnColor);
	}
	if (tempArray.length > 0) {
		btnClass = tempArray.join(" ");
	}

	// if (iconOnly) {
	// 	return (
	// 		<IconButton
	// 			type={type}
	// 			className={`Button icon-btn ${btnClass}`}
	// 			disabled={disabled}
	// 			onClick={onClick}
	// 		>
	// 			<FontIcon
	// 				iconName={iconName}
	// 				size={size}
	// 				color={color}
	// 				place={place}
	// 				tooltip={name}
	// 				badge={iconBadge}
	// 			/>
	// 		</IconButton>
	// 	);
	// }
	return (
    <Button
      type={type}
      className={`Button normal-btn ${btnClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {/* {iconName && iconName !== "" && (
        <FontIcon iconName={iconName} badge={iconBadge} size="xmedium" />
      )} */}
      {name}
      {subname && subname !== "" && <span className="subname"> {subname} </span>}
    </Button>
  );
};

CustomButton.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	plain: PropTypes.bool,
	outline: PropTypes.bool,
	rounded: PropTypes.bool,
	onClick: PropTypes.func,
	iconTop: PropTypes.bool,
	iconRight: PropTypes.bool,
	iconName: PropTypes.string,
	iconOnly: PropTypes.bool,
	size: PropTypes.string,
	color: PropTypes.string,
	btnSize: PropTypes.string,
	place: PropTypes.string,
	btnColor: PropTypes.string,
	iconBtn: PropTypes.bool,
	iconBadge: PropTypes.bool
};

CustomButton.defaultProps = {
	name: "",
	type: null,
	disabled: false,
	plain: false,
	outline: false,
	rounded: false,
	onClick: () => {},
	iconTop: false,
	iconRight: false,
	iconName: "",
	iconOnly: false,
	size: "default",
	color: "",
	btnSize: "",
	place: "bottom",
	btnColor: "",
	iconBtn: false,
	iconBadge: false
};
