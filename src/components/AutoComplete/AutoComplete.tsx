import React, {
  ChangeEvent,
  CSSProperties,
  ReactElement,
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
} from "react";
import classNames from "classnames";
import { Input, InputProps } from "../Input/Input";
import { getPrefixCls } from "../utils/comp-utils";
import Icon from "../Icon/Icon";
import useDebounceValue from "../hooks/useDebounceValue";
import useClickOutside from "../hooks/useClickOutside";
import Transition from "../Transition/Transition";

interface DataSrouceObject {
  value: string;
}

export type DataSrouceType<T extends {} = {}> = T & DataSrouceObject;

export interface AutoCompleteProps
  extends Omit<
    InputProps,
    "onSelect" | "prefixCls" | "className" | "style" | "value"
  > {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  value?: string;
  renderOption?: (item: DataSrouceType) => ReactElement;
  fetchSuggestions?: (
    keyword: string
  ) => Promise<DataSrouceType[]> | DataSrouceType[];
  onSelect?: (item: DataSrouceType) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    className,
    style,
    value,
    renderOption,
    fetchSuggestions,
    onSelect,
    ...resetProps
  } = props;

  const [inputValue, setInputValue] = useState<string | undefined>(value);

  const [suggestions, setSuggestions] = useState<DataSrouceType[]>([]);

  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const triggerSearch = useRef<boolean>(false);

  const componentRef = useRef<HTMLDivElement>(null);

  const debounceValue = useDebounceValue<string | undefined>(inputValue, 300);

  const [loading, setLoading] = useState<boolean>(false);

  const autoCompletePrefixCls = getPrefixCls("auto-complete");

  const suggestionPrefixCls = getPrefixCls("suggestion");

  const nextClassName = classNames(autoCompletePrefixCls, className);

  const suggestionClassName = classNames(suggestionPrefixCls, className);

  useEffect(() => {
    (async () => {
      if (debounceValue && triggerSearch.current) {
        try {
          setLoading(true);
          setSuggestions([]);
          const result = await fetchSuggestions?.(debounceValue);
          setSuggestions(result || []);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
      setHighlightIndex(-1);
    })();
  }, [fetchSuggestions, debounceValue]);

  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  const handleSelect = (item: DataSrouceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    onSelect?.(item);
    triggerSearch.current = false;
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
    triggerSearch.current = true;
  };

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Escape":
        setSuggestions([]);
        break;
      case "Enter":
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case "ArrowUp":
        highlight(highlightIndex - 1);
        break;
      case "ArrowDown":
        highlight(highlightIndex + 1);
        break;
      default:
        break;
    }
  };

  const renderTemplate = (item: DataSrouceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const renderDropdown = () => {
    return (
      <Transition
        in={!!suggestions.length}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={suggestionClassName}>
          {suggestions.map((item, index) => {
            const suggestionItemClassName = classNames(
              `${suggestionPrefixCls}-item`,
              {
                "is-active": index === highlightIndex,
              },
              className
            );
            return (
              <li
                key={index}
                className={suggestionItemClassName}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className={nextClassName} style={style} ref={componentRef}>
      <Input
        value={inputValue}
        {...resetProps}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {loading ? (
        <div className={`${suggestionClassName}-loading-icon`}>
          <Icon icon="spinner" spin />
        </div>
      ) : null}

      {renderDropdown()}
    </div>
  );
};

AutoComplete.defaultProps = {
  size: "small",
};

export default AutoComplete;
