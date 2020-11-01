import React, { useEffect, useRef, useState } from 'react';
import { getScale, getOuterStyles, getRotation, getEventCoordinates, EventType } from './helpers';
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

  const onDragMouseDown = (event: EventType) => {
    setDragStartPosition(getEventCoordinates(event));
    setIsDragging(true);
  };

  const onScaleMouseDown = (event: EventType, top: boolean, left: boolean) => {
    setScaleStartPosition({
      ...getEventCoordinates(event),
      top,
      left,
    });
    setIsScaling(true);
  };

  const onRotateMouseDown = (event: EventType) => {
    setRotationStartPosition(getEventCoordinates(event));
    setIsRotating(true);
  };

  useEffect(() => {
    const onMouseUp = () => {
      setIsDragging(false);
      setIsScaling(false);
      setIsRotating(false);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
    }
  }, []);

  useEffect(() => {
    const onDrag = (event: EventType) => {
      setPositionX(positionX + getEventCoordinates(event).x - dragStartPosition.x);
      setPositionY(positionY + getEventCoordinates(event).y - dragStartPosition.y);
    };

    if (isDragging) {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('touchmove', onDrag);
    } else {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('touchmove', onDrag);
    }

    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('touchmove', onDrag);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, dragStartPosition]);

  useEffect(() => {
    const onScale = (event: EventType) => {
      if (itemRef.current) {
        const eventX = getEventCoordinates(event).x
        const eventY = getEventCoordinates(event).y
        const scaleX = getScale(scale.x, eventX - scaleStartPosition.x, width, scaleStartPosition.left);
        const scaleY = getScale(scale.y, eventY - scaleStartPosition.y, height, scaleStartPosition.top);
        const isMinWidth = scaleX * width < minSize;
        const isMinHeight = scaleY * height < minSize;

        setScale({
          x: isMinWidth ? minSize / width : scaleX,
          y: isMinHeight ? minSize / height : scaleY,
        });

        if (!isMinWidth) {
          setPositionX(scaleStartPosition.left ? eventX : positionX);
        }
        if (!isMinHeight) {
          setPositionY(scaleStartPosition.top ? eventY : positionY);
        }
      }
    };

    if (isScaling) {
      document.addEventListener('mousemove', onScale);
      document.addEventListener('touchmove', onScale);
    } else {
      document.removeEventListener('mousemove', onScale);
      document.removeEventListener('touchmove', onScale);
    }

    return () => {
      document.removeEventListener('mousemove', onScale);
      document.removeEventListener('touchmove', onScale);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScaling, scaleStartPosition, width, height]);

  useEffect(() => {
    const onRotate = (event: EventType) => {
      setRotation(getRotation(rotationStartPosition.x, rotationStartPosition.y, getEventCoordinates(event).x, getEventCoordinates(event).y));
    };

    if (isRotating) {
      document.addEventListener('mousemove', onRotate);
      document.addEventListener('touchmove', onRotate);
    } else {
      document.removeEventListener('mousemove', onRotate);
      document.removeEventListener('touchmove', onRotate);
    }

    return () => {
      document.removeEventListener('mousemove', onRotate);
      document.removeEventListener('touchmove', onRotate);
    }
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
        <ItemContainer onMouseDown={onDragMouseDown} onTouchStart={onDragMouseDown} >
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
