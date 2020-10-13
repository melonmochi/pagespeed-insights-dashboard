import { FC, useEffect, useRef, useState, ChangeEvent, useContext } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContext } from '@/contexts';
import { ColorTag } from '@/components';
import './versions-group.less';

interface VersionsGroupState {
  tags: string[];
  inputVisible: boolean;
  inputValue: string;
  editInputIndex: number;
  editInputValue: string;
}

const VersionsGroup: FC = () => {
  const { state: pageState, dispatch } = useContext(PageContext);
  const { versions: pageVersions } = pageState;
  const defaultState: VersionsGroupState = {
    tags: pageVersions,
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  };
  const [state, setState] = useState<VersionsGroupState>(defaultState);
  const saveInputRef = useRef<Input>(null);
  const saveEditInputRef = useRef<Input>(null);

  const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = state;

  useEffect(() => {
    dispatch({
      type: 'CHANGE_VERSIONS',
      payload: tags,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const handleClose = (removedTag: string) => {
    setState({ ...state, tags: tags.filter((tag) => tag !== removedTag) });
  };

  const showInput = () => {
    setState({ ...state, inputVisible: true });
  };

  useEffect(() => {
    if (saveInputRef && saveInputRef.current) {
      saveInputRef.current.focus();
    }
  }, [inputVisible]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    let newTags: string[] = tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
    }
    setState({
      ...state,
      tags: newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, editInputValue: e.target.value });
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setState({
      ...state,
      tags: newTags,
      editInputIndex: -1,
      editInputValue: '',
    });
  };

  const handleDoubleClickTag = ({ index, tag }: { index: number; tag: string }) => {
    if (index !== 0) {
      setState({
        ...state,
        editInputIndex: index,
        editInputValue: tag,
      });
    }
  };

  useEffect(() => {
    if (saveEditInputRef && saveEditInputRef.current) {
      saveEditInputRef.current.focus();
    }
  }, [editInputIndex, editInputValue]);

  const tagOptions = tags.map((tag, index) => {
    if (editInputIndex === index) {
      return (
        <Input
          ref={saveEditInputRef}
          key={tag}
          size="small"
          className="tag-input"
          value={editInputValue}
          onChange={handleEditInputChange}
          onBlur={handleEditInputConfirm}
          onPressEnter={handleEditInputConfirm}
        />
      );
    }

    const isLongTag = tag.length > 20;

    const tagElem = (
      <ColorTag
        key={tag}
        closable={index !== 0}
        onClose={() => handleClose(tag)}
        colorNumberKey={index}
      >
        <span
          onDoubleClick={() => {
            handleDoubleClickTag({ tag, index });
          }}
        >
          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
        </span>
      </ColorTag>
    );

    return isLongTag ? (
      <Tooltip title={tag} key={tag}>
        {tagElem}
      </Tooltip>
    ) : (
      tagElem
    );
  });

  return (
    <>
      {tagOptions}
      {inputVisible ? (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          placeholder="111"
        />
      ) : (
        tags.length < 3 && (
          <Tag className="site-tag-plus" onClick={showInput}>
            <PlusOutlined /> New Version
          </Tag>
        )
      )}
    </>
  );
};

export default VersionsGroup;
