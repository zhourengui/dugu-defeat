import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-right"
  | "zoom-in-bottom";

type TransitionProps = {
  animation?: AnimationName;
} & CSSTransitionProps;

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, ...resetProps } = props;

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...resetProps}
    >
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true,
};

export default Transition;
