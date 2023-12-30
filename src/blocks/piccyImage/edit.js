import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { useSelect } from "@wordpress/data";
import { Icon } from "@wordpress/components";

import "./editor.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPanorama } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ImageThumbnail } from "../../components/imageThumbnail";
config.autoAddCss = false;

import { useImage } from "../../hooks/useImage";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useImage(props.attributes.imageId);

	const imageSelected = props.attributes.imageId && image?.source_url;

	return (
		<div {...blockProps}>
			{imageSelected && <ImageThumbnail imageId={props.attributes.imageId} />}

			{!imageSelected && (
				<div
					style={{
						display: "flex",
						height: "150px",
						width: "100%",
						backgroundColor: "#fff",
					}}
				>
					{/* <Icon icon="format-image" style={{ margin: "auto" }} /> */}
					<FontAwesomeIcon icon={faPanorama} style={{ margin: "auto" }} />
				</div>
			)}

			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image"]}
					render={({ open }) => {
						return (
							<button className="media-select" onClick={open}>
								{imageSelected
									? __("Replace image", metadata.textdomain)
									: __("Select an image", metadata.textdomain)}
							</button>
						);
					}}
					value={props.attributes.imageId}
					onSelect={(item) => {
						props.setAttributes({
							imageId: item.id,
						});
					}}
				/>
			</MediaUploadCheck>
		</div>
	);
}
