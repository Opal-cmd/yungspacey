export type IntakePayload = {
  artistName: string;
  instagram: string;
  service: string;
  description: string;
  demoLink: string;
};

export type IntakeFieldErrors = Partial<Record<keyof IntakePayload, string>>;

export const INTAKE_SERVICES = [
  { value: "mix-master", label: "Mix & Master" },
  { value: "executive-production", label: "Executive Production" },
  { value: "custom-inquiry", label: "Custom Inquiry" },
] as const;

export function serviceLabel(value: string): string {
  return (
    INTAKE_SERVICES.find((s) => s.value === value)?.label ?? value
  );
}

export function validateIntake(values: IntakePayload): IntakeFieldErrors {
  const errors: IntakeFieldErrors = {};

  if (!values.artistName.trim()) {
    errors.artistName = "Artist / stage name is required.";
  } else if (values.artistName.trim().length < 2) {
    errors.artistName = "Enter at least 2 characters.";
  }

  const handle = values.instagram.trim();
  if (!handle) {
    errors.instagram = "Instagram handle is required.";
  } else if (!/^@?[A-Za-z0-9._]{1,30}$/.test(handle)) {
    errors.instagram = "Use a valid Instagram handle.";
  }

  if (!values.service) {
    errors.service = "Select a service.";
  } else if (!INTAKE_SERVICES.some((s) => s.value === values.service)) {
    errors.service = "Select a valid service.";
  }

  if (!values.description.trim()) {
    errors.description = "Add a project description or references.";
  } else if (values.description.trim().length < 12) {
    errors.description = "Give a bit more detail (12+ characters).";
  }

  const link = values.demoLink.trim();
  if (!link) {
    errors.demoLink = "Demo / stem link is required.";
  } else if (
    !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i.test(link) &&
    !/^(drive\.google|dropbox|wetransfer|linktr\.ee)/i.test(link)
  ) {
    errors.demoLink = "Paste a valid Drive, Dropbox, or WeTransfer link.";
  }

  return errors;
}

export function normalizeInstagram(handle: string): string {
  const trimmed = handle.trim();
  if (!trimmed) return trimmed;
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}
