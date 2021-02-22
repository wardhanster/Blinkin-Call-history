import React from 'react';
import { Modal, Button, ModalBody, ModalHeader } from 'reactstrap';
import { PDFReader } from 'reactjs-pdf-reader';

const RenderPdf = ({ link, name }) => {
  const [preview, setPreview] = React.useState(false);
  const toggle = () => setPreview(!preview);
  return (
    <>
      <Modal className='pdfPreviewModal' isOpen={preview} toggle={toggle} style={{ maxWidth: '800px' }}>
        <ModalHeader toggle={toggle}>
          PDF Viewer <small>(Beta)</small>
        </ModalHeader>
        <ModalBody style={{ overflow: 'scroll', maxHeight: '90vh' }}>
          {preview ? <PDFReader url={link} width={700} showAllPage /> : null}
        </ModalBody>
      </Modal>
      <Button color='link' style={{ color: 'white' }} onClick={() => setPreview(true)}>
        <i className='fa fa-file-pdf-o' style={{ fontSize: 50 }}></i> <br />
        {name}
      </Button>
    </>
  );
};

export default RenderPdf;
