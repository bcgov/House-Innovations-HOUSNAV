"use client";
import { Dialog, DialogTrigger, Heading, Modal, ModalOverlay} from 'react-aria-components';


import "./ModalSide.css";
import Icon from '../icon/Icon';
import Button from '../button/Button';

export interface ModalSideProps {
  sections: { number: string, header: string, content: string }[];
}

export default function ModalSide({sections, ...props }: ModalSideProps) {
  return (
    <DialogTrigger >
    <Button>Open modal</Button>

    <ModalOverlay className="my-overlay" >
      <Modal className="my-modal" isKeyboardDismissDisabled>
        <Dialog className="react-aria-Dialog">
          {({ close }) => <>
            <Button
              isIconButton
              variant="secondary"
              className="close-button"
              onPress={close}
            >
              <Icon type="close" />
            </Button>
            <div className="modal-header"></div>
            <div className="modal-content">
              {sections.map((section, index) => (
                <div key={index} className="modal-section">
                  <div className="section-header-line">
                    <Heading level={3} className="section-number">{section.number}</Heading>
                    <Heading className="section-header">{section.header}</Heading>
                  </div>
                  <div className="section-content-line">
                    <p className="section-content">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </>}
        </Dialog>
      </Modal>
    </ModalOverlay>
  </DialogTrigger>

  );
}