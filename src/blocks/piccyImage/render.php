<?php
$block_wrapper_attributes = get_block_wrapper_attributes();
if ( isset( $attributes['imageId'] ) ) {
	$image_uri       = wp_get_attachment_image_url( $attributes['imageId'] );
	$image_uri_large = wp_get_attachment_image_url( $attributes['imageId'], 'large' );
	?>
<div <?php echo $block_wrapper_attributes; ?>>
	<img src="<?php echo esc_url( $image_uri ); ?>" data-large-size="<?php echo esc_url( $image_uri_large ); ?>" class="thumb">
</div>
	<?php
}?>
