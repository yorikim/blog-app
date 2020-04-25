class CoverUploader < CarrierWave::Uploader::Base
  storage :file

  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  def store_dir
    filename = model.send(:"#{mounted_as}_identifier")
    "uploads/#{model.class.name.underscore}/#{filename[0..1]}/#{filename[3..4]}"
  end

  def filename
    if original_filename

      existing = model.send(:"#{mounted_as}_identifier")

      # reuse the existing file name from the model if present.
      # otherwise, generate a new one (and cache it in an instance variable)
      @generated_filename ||= if existing.present?
        existing
      else
        "#{sha1_for file}-#{SecureRandom.hex(4)}.#{file.extension}"
      end

    end
  end

  private

  def sha1_for file
    Digest::SHA1.hexdigest file.read
  end
end
