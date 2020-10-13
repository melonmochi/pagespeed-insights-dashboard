import { FC, useState } from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import { PageContextProvider } from '@/contexts';
import { Input } from '@/components';
import './pages.less';

const { TabPane } = Tabs;

interface Pan {
  title: string;
  content: JSX.Element;
  key: string;
  closable?: boolean;
}

const initialPanes = [{ title: 'Page 1', content: <Input />, key: '1', closable: false }];

const Pages: FC = () => {
  const [newPageKey, setNewPageKey] = useState<number>(1);
  const [activeKey, setActiveKey] = useState<string>(initialPanes[0].key);
  const [panes, setPanes] = useState<Pan[]>(initialPanes);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const key = `newPage${Math.random().toString()}`;
    const newPanes = [...panes];
    newPanes.push({ title: `Page ${newPageKey + 1}`, content: <Input />, key });
    setNewPageKey(newPageKey + 1);
    setPanes(newPanes);
    setActiveKey(key);
  };

  const remove = (
    targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => {
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex && lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
    switch (action) {
      case 'add':
        add();
        break;
      case 'remove':
        remove(targetKey);
        break;
    }
  };

  return (
    <Tabs
      className="pages"
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
    >
      {panes.map((pane) => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          <PageContextProvider>{pane.content}</PageContextProvider>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default Pages;
