import {
	useBlockProps,
	BlockControls,
	InnerBlocks,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton, Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { ImageThumbnail } from "../../components/imageThumbnail";

import "./editor.scss";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(
		{
			className: "piccy-gallery-inner-block",
		},
		{
			allowedBlocks: ["blockylicious/piccy-image"],
		},
	);
	const [editMode, setEditMode] = useState(true);
	const innerBlocks = useSelect((select) => {
		const { getBlocksByClientId } = select("core/block-editor");
		const block = getBlocksByClientId(props.clientId)?.[0];
		return block?.innerBlocks;
	}, []);
	const [previewModeImage, setPreviewModeMode] = useState({
		imageId: innerBlocks?.[0]?.attributes,
		blockId: innerBlocks?.[0]?.clientId,
	});

	return (
		<>
			<div {...blockProps}>
				{editMode && (
					<div className="edit-mode">
						<span className="piccy-label">
							{__("Piccy image gallery", metadata.textdomain)}
						</span>
						<div {...innerBlockProps} />
					</div>
				)}
				{!editMode && (
					<>
						<div className="preview-mode">
							{(innerBlocks || []).map((innerBlock) => (
								<ImageThumbnail
									key={innerBlock.clientId}
									imageId={innerBlock.attributes.imageId}
									height="75"
									className={`thumb ${
										innerBlock.clientId === previewModeImage.blockId
											? "selected"
											: ""
									}`}
									onClick={() => {
										setPreviewModeMode({
											imageId: innerBlock.attributes.imageId,
											blockId: innerBlock.clientId,
										});
									}}
								/>
							))}
						</div>

						<div>
							<ImageThumbnail
								height="initial"
								imageId={previewModeImage?.imageId}
							/>
						</div>
					</>
				)}
			</div>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={
							editMode ? (
								<Icon icon="welcome-view-site" />
							) : (
								<Icon icon="edit" />
							)
						}
						label={
							editMode
								? __("Preview gallery", metadata.textdomain)
								: __("Edit gallery", metadata.textdomain)
						}
						onClick={() => setEditMode((prevState) => !prevState)}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
