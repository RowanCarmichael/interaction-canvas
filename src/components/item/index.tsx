import React, { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import { getScale, getOuterStyles, getRotation } from './helpers';
import { InnerContainer, OuterContainer, ItemContainer } from './styles';
import Controls from './controls';

export type ItemProps = {
  children: React.ReactElement;
  defaultPosition?: { x: number; y: number };
};

const minSize = 20;

const Item: React.FC<ItemProps> = ({ children, defaultPosition = { x: 0, y: 0 } }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isFocussed, setIsFocussed] = useState(false);
  const width = itemRef?.current?.clientWidth || 0;
  const height = itemRef?.current?.clientHeight || 0;

  const [isDragging, setIsDragging] = useState(false);
  const [positionX, setPositionX] = useState(defaultPosition.x);
  const [positionY, setPositionY] = useState(defaultPosition.y);
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });

  const [isScaling, setIsScaling] = useState(false);
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [scaleStartPosition, setScaleStartPosition] = useState({
    x: 0,
    y: 0,
    top: true,
    left: true,
  });

  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [rotationStartPosition, setRotationStartPosition] = useState({
    x: 0,
    y: 0,
  });

  const onDragMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragStartPosition({ x: event.clientX, y: event.clientY });
    setIsDragging(true);
  };

  const onScaleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, top: boolean, left: boolean) => {
    setScaleStartPosition({
      x: event.clientX,
      y: event.clientY,
      top,
      left,
    });
    setIsScaling(true);
  };

  const onRotateMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setRotationStartPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setIsRotating(true);
  };

  useEffect(() => {
    const onMouseUp = () => {
      setIsDragging(false);
      setIsScaling(false);
      setIsRotating(false);
    };

    document.addEventListener('mouseup', onMouseUp);

    return () => document.addEventListener('mouseup', onMouseUp);
  }, []);

  useEffect(() => {
    const onDrag = throttle((event: MouseEvent) => {
      setPositionX(positionX + event.clientX - dragStartPosition.x);
      setPositionY(positionY + event.clientY - dragStartPosition.y);
    }, 10);

    if (isDragging) {
      document.addEventListener('mousemove', onDrag);
    } else {
      document.removeEventListener('mousemove', onDrag);
    }

    return () => document.removeEventListener('mousemove', onDrag);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, dragStartPosition]);

  useEffect(() => {
    const onScale = throttle((event: MouseEvent) => {
      if (itemRef.current) {
        const scaleX = getScale(scale.x, event.clientX - scaleStartPosition.x, width, scaleStartPosition.left);
        const scaleY = getScale(scale.y, event.clientY - scaleStartPosition.y, height, scaleStartPosition.top);
        const isMinWidth = scaleX * width < minSize;
        const isMinHeight = scaleY * height < minSize;

        setScale({
          x: isMinWidth ? minSize / width : scaleX,
          y: isMinHeight ? minSize / height : scaleY,
        });

        if (!isMinWidth) {
          setPositionX(scaleStartPosition.left ? event.clientX : positionX);
        }
        if (!isMinHeight) {
          setPositionY(scaleStartPosition.top ? event.clientY : positionY);
        }
      }
    }, 10);

    if (isScaling) {
      document.addEventListener('mousemove', onScale);
    } else {
      document.removeEventListener('mousemove', onScale);
    }

    return () => document.removeEventListener('mousemove', onScale);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScaling, scaleStartPosition, width, height]);

  useEffect(() => {
    const onRotate = throttle((event: any) => {
      setRotation(getRotation(rotationStartPosition.x, rotationStartPosition.y, event.clientX, event.clientY));
    }, 10);

    if (isRotating) {
      document.addEventListener('mousemove', onRotate);
    } else {
      document.removeEventListener('mousemove', onRotate);
    }

    return () => document.removeEventListener('mousemove', onRotate);
  }, [isRotating, rotationStartPosition]);

  return (
    <OuterContainer
      style={getOuterStyles({
        itemExists: !!itemRef.current,
        positionX,
        positionY,
        rotation,
        width,
        height,
        scaleX: scale.x,
        scaleY: scale.y,
      })}
      tabIndex={0}
      onFocus={() => setIsFocussed(true)}
      onBlur={() => setIsFocussed(false)}
    >
      <InnerContainer
        ref={itemRef}
        style={{
          transform: `scaleX(${scale.x}) scaleY(${scale.y})`,
        }}
        showOutline={!itemRef.current}
      >
        <ItemContainer onMouseDown={onDragMouseDown}>
          {React.cloneElement(children, {
            draggable: false,
            onClick: (event: MouseEvent) => {
              event.preventDefault();
            },
            onDragStart: (event: MouseEvent) => {
              event.preventDefault();
            },
          })}
        </ItemContainer>
      </InnerContainer>
      {isFocussed && <Controls onScaleMouseDown={onScaleMouseDown} onRotateMouseDown={onRotateMouseDown} />}
    </OuterContainer>
  );
};

export default Item;
