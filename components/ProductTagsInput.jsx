import {
  LegacyStack,
  Tag,
  Listbox,
  Combobox,
  Icon,
  TextContainer,
} from "@shopify/polaris";

import { SearchMinor } from "@shopify/polaris-icons";
import React from "react";

import { useState, useCallback } from "react";

export default function ProductTagsInput({ getTags }) {
  const [deselectedOptions, setDeselectedOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [loading, setLoading] = useState(false);

  async function getProductTags() {
    // only fetch the tags once
    if (deselectedOptions.length > 0) {
      return;
    }

    setLoading(true);
    const tags = await getTags();

    const options = tags.map((tag) => {
      return { value: tag, label: tag };
    });

    setDeselectedOptions(options);
    setOptions(options);
    setLoading(false);
  }

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback(
    (selected) => {
      if (selectedOptions.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== selected)
        );
      } else {
        setSelectedOptions([...selectedOptions, selected]);
      }

      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      updateText("");
    },
    [options, selectedOptions, updateText]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions]
  );

  const tagsMarkup = selectedOptions.map((option) => (
    <Tag key={`option-${option}`} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOptions.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  const loadingMarkup = loading ? <Listbox.Loading /> : null;

  const listboxMarkup =
    optionsMarkup || loadingMarkup ? (
      <Listbox onSelect={updateSelection}>
        {optionsMarkup && !loading ? optionsMarkup : null}
        {loadingMarkup}
      </Listbox>
    ) : null;

  return (
    <div>
      <div style={{ marginBottom: "1rem", minHeight: "40px" }}>
        <LegacyStack>{tagsMarkup}</LegacyStack>
      </div>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchMinor} />}
            onChange={updateText}
            label="Search tags to add or remove from products"
            labelHidden
            value={inputValue}
            placeholder="Search tags to add or remove from products"
            onFocus={getProductTags}
          />
        }
      >
        {listboxMarkup}
      </Combobox>
    </div>
  );
}